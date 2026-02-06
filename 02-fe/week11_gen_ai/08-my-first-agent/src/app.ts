import { OpenAI } from 'openai';
import {
	Agent,
	OpenAIChatCompletionsModel,
	run,
	setDefaultOpenAIClient,
	tool,
	handoff,
	InputGuardrailTripwireTriggered,
	type RunContext,
	type InputGuardrail
} from '@openai/agents';
import { z } from 'zod';

// Instantiate the OpenAI client with the API key and base URL from environment variables
// We do this so we can use OpenAI-compatible APIs like those provided by Ollama or LM Studio
// If undefined, say in production, it will use the default OpenAI API
const client = new OpenAI({
	apiKey:
		process.env.NODE_ENV === 'development' ? process.env.LLM_KEY : undefined,
	baseURL:
		process.env.NODE_ENV === 'development' ? process.env.LLM_URL! : undefined
});
// Set the default OpenAI client for the agent framework
// This register our custom client so that the agent can use it for making requests
// @ts-expect-error
setDefaultOpenAIClient(client);
// The Agents SDK uses the OpenAI Responses API under the hood, however it accept any valid Model type
// In development, we use the OpenAIChatCompletionsModel to register an OpenAI Chat Completions Model
// We do this so that we can use the OpenAI-compatible APIs provided by Ollama or LM Studio
const model =
	process.env.NODE_ENV === 'development'
		? // @ts-expect-error
		  new OpenAIChatCompletionsModel(client, process.env.LLM_MODEL!)
		: process.env.LLM_MODEL!;

const EscalationData = z.object({ reason: z.string() });
type EscalationData = z.infer<typeof EscalationData>;
const guardrailAgent = new Agent({
	name: 'Guardrail check',
	instructions:
		'We sell pillows. If the input is remotely about pillows return isNotAboutPillows: false, otherwise return true.',
	model,
	outputType: z.object({
		isNotAboutPillows: z.boolean(),
		reasoning: z.string()
	})
});

const pillowGuardrails: InputGuardrail = {
	name: 'Pillow Customer Support Guardrail',
	execute: async ({ input, context }) => {
		const result = await run(guardrailAgent, input, { context });
		return {
			outputInfo: result.finalOutput,
			tripwireTriggered: result.finalOutput?.isNotAboutPillows ?? false
		};
	}
};

const customerSupportAgent = new Agent({
	name: 'Customer Support Agent',
	instructions: `You are a customer support agent in a company that sells very fluffy pillows. 
                Be friendly, helpful. and concise.`,
	model
});
const escalationControlAgent = new Agent({
	name: 'Escalation Control Agent',
	instructions: `You are an escalation control agent that handles negative customer interactions. 
            If the customer is upset, you will apologize and offer to escalate the issue to a manager.
            Be friendly, helpful, reassuring and concise.`,
	model
});

const triageAgent = Agent.create({
	name: 'Triage Agent',
	instructions: `If the question is about pillows, route it to the customer support agent. 
        If the customer's tone is negative, route it to the escalation control agent.
        `,
	model,
	inputGuardrails: [pillowGuardrails],
	// handoffs: [customerSupportAgent, escalationControlAgent]
	handoffs: [
		customerSupportAgent,
		handoff(escalationControlAgent, {
			inputType: EscalationData,
			// Make sure to explore RunContext type
			onHandoff: async (
				ctx: RunContext<EscalationData>,
				input: EscalationData | undefined
			) => {
				console.log(`Handoff to Escalation Control Agent: ${input?.reason}`);
			}
		})
	]
});

try {
	// Run the agent with a specific task
	// const result = await run(
	// 	triageAgent,
	// 	'What is the return policy for your pillows?'
	// );

	// const result = await run(
	// 	triageAgent,
	// 	'The pillows are too fluffy and I am not happy with my purchase.'
	// );

	// const result = await run(triageAgent, 'What do you know about nuclear fusion?');

	// Run the agent with a specific task
	const result = await run(triageAgent, 'What is the meaning of life?');
	// Log the final output of the agent
	console.log(result.finalOutput);
} catch (error: unknown) {
	if (error instanceof InputGuardrailTripwireTriggered) {
		console.log(
			'Customer is not asking about pillows, or the input is not valid for the guardrail.'
		);
	} else {
		console.error('An error occurred:', error);
	}
}
