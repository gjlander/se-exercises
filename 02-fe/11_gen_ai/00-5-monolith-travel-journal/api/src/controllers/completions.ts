import type { RequestHandler } from 'express';
import OpenAI from 'openai';
import { isValidObjectId } from 'mongoose';
import {
  Agent,
  OpenAIChatCompletionsModel,
  run,
  setDefaultOpenAIClient,
  user,
  assistant,
  InputGuardrailTripwireTriggered,
  type InputGuardrail
} from '@openai/agents';
import { z } from 'zod';
import { Chat } from '#models';
import type { IncomingPrompt } from '#types';
import { getPostsTool } from '#utils';
import { AI_API_KEY, AI_MODEL, AI_URL } from '#config';

type ResponseCompletion = { completion: string };
type ResponseWithId = ResponseCompletion & { chatId: string };

export const getChatHistory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const chat = await Chat.findById(id);

  if (!chat) throw new Error('Chat not found', { cause: { status: 404 } });

  res.json(chat);
};

export const createAgenticChat: RequestHandler<unknown, ResponseWithId, IncomingPrompt> = async (req, res) => {
  const { prompt, chatId } = req.body;
  const { user: userInfo } = req;
  const signedIn = userInfo?.id ? true : false;

  // console.log('userInfo:', userInfo);
  let currentChat = await Chat.findById(chatId);

  if (!currentChat) {
    currentChat = await Chat.create({});
  }

  // add user message to database history
  currentChat.history.push({
    role: 'user',
    content: prompt
  });

  const formattedHistory = currentChat.history.map(entry =>
    entry.role === 'user' ? user(entry.content) : assistant(entry.content)
  );

  const client = new OpenAI({
    apiKey: AI_API_KEY,
    baseURL: AI_URL
  });
  // Set the default OpenAI client for the agent framework
  // This register our custom client so that the agent can use it for making requests
  setDefaultOpenAIClient(client);

  const model = new OpenAIChatCompletionsModel(client, AI_MODEL);

  const guardrailAgent = new Agent({
    name: 'Guardrail check',
    instructions: `We give travel recommendations. If the input is remotely about travel and travel destinations
       return isNotAboutTravel: false, otherwise return true.`,
    model,
    outputType: z.object({
      isNotAboutTravel: z.boolean(),
      reasoning: z.string()
    })
  });

  const travelGuardRails: InputGuardrail = {
    name: 'Travel Assistant Guardrail',
    execute: async ({ input, context }) => {
      const result = await run(guardrailAgent, input, { context });
      return {
        outputInfo: result.finalOutput,
        tripwireTriggered: result.finalOutput?.isNotAboutTravel ?? false
      };
    }
  };

  const generalizedAgent = new Agent({
    name: 'Generalized Agent',
    instructions: `You offer general travel advice and recommendations. You suggest that the user log in to 
    get more personalized results. If the user asks for follow up questions about a travel destination, use your general knowledge.`,
    model
  });
  const personalizedAgent = new Agent({
    name: 'Personalized Agent',
    instructions: `You are a helpful assistant with memory of past conversations for user with userId: ${userInfo?.id}.
      Do not ask  the user for their id, it is provided in the instructions here: ${userInfo?.id}.
       You can access user posts if needed using the get_posts tool. 
       If the user asks for travel recommendations, please call the tool and and use the information to offer personalized travel
       recommendations.
       If the user asks for more information about a travel destination, use your general knowledge.`,
    model,
    tools: [getPostsTool]
  });

  const triageAgent = new Agent({
    name: 'Triage Agent',
    instructions: `${signedIn ? 'The user is logged in.' : 'The user is not logged in'}
      If the user is logged in, handoff to the personalized agent.
      If the user is not logged in, handoff to the generalized agent.
        `,
    model,
    inputGuardrails: [travelGuardRails],
    // handoffs: [generalizedAgent, personalizedAgent]
    handoffs: [generalizedAgent, personalizedAgent]
  });

  try {
    const result = await run(triageAgent, formattedHistory);
    // Log the final output of the agent
    // console.log(result.finalOutput);

    if (result.finalOutput) {
      currentChat.history.push({
        role: 'assistant',
        content: result.finalOutput
      });
    }

    await currentChat.save();
    res.json({
      completion: result.finalOutput || 'Something went wrong, please ask again.',
      chatId: currentChat._id.toString()
    });
  } catch (error: unknown) {
    if (error instanceof InputGuardrailTripwireTriggered) {
      res.json({
        completion: 'That is outside of my abilities, I only answer questions about travel.',
        chatId: currentChat._id.toString()
      });
    } else {
      console.error('An error occurred:', error);
      res.json({
        completion: 'Sorry, something went wrong, please ask again.',
        chatId: currentChat._id.toString()
      });
    }
  }
};
