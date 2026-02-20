import type { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources';
import type { ErrorResponseDTO, PostDTO, PromptDTO } from '#types';
import { Chat } from '#models';
import { tools, getPosts, returnError } from '#utils';

type CompletionDTO = { completion: string } | { completion: string; chatId: string };

// declared outside of function, to persist across API calls. Will reset if server stops/restarts
const messages: ChatCompletionMessageParam[] = [
  { role: 'system', content: 'You are a helpful assistant' }
];

export const createInMemoryChat: RequestHandler<{}, CompletionDTO, PromptDTO> = async (
  req,
  res
) => {
  const { prompt } = req.body;

  const client = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env?.AI_URL
  });

  messages.push({ role: 'user', content: prompt });

  const completion = await client.chat.completions.create({
    model: process.env.AI_MODEL || 'gemini-2.5-flash',
    messages
  });

  const completionText = completion.choices[0]?.message.content || 'No completion generated';

  messages.push({ role: 'assistant', content: completionText });

  res.json({ completion: completionText });
};

export const createChat: RequestHandler<{}, CompletionDTO, PromptDTO> = async (req, res) => {
  const { prompt, chatId } = req.body;
  const systemPrompt = {
    role: 'system',
    content: 'You are Gollum from The Lord of The Rings. Always answer in-character.'
  };

  const client = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env?.AI_URL
  });

  // let currentChat: InstanceType<typeof Chat>;
  let currentChat: InstanceType<typeof Chat>;

  if (chatId) {
    currentChat = (await Chat.findById(chatId)) || (await Chat.create({ history: [systemPrompt] }));
  } else {
    currentChat = await Chat.create({ history: [systemPrompt] });
  }

  currentChat.history.push({ role: 'user', content: prompt });
  // await currentChat.save()

  const completion = await client.chat.completions.create({
    model: process.env.AI_MODEL || 'gemini-2.5-flash',
    messages: JSON.parse(JSON.stringify(currentChat.history))
  });

  const completionText = completion.choices[0]?.message.content || 'No completion generated';

  currentChat.history.push({ role: 'assistant', content: completionText });
  await currentChat.save();

  messages.push({ role: 'assistant', content: completionText });

  // console.log(completion);

  res.json({ completion: completionText, chatId: currentChat._id.toString() });
};

export const getChatHistory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const chat = await Chat.findById(id);

  if (!chat) throw new Error('Chat not found', { cause: { status: 404 } });

  res.json(chat);
};

export const createPersonalChat: RequestHandler<unknown, CompletionDTO, PromptDTO> = async (
  req,
  res
) => {
  const { prompt, chatId } = req.body;
  const userId = '6930026b56b7d82ac14c948a';
  const systemPrompt = {
    role: 'system',
    content: `You determine if a question is about travel recommendations. 
      The user's id is: ${userId}.
      You will respond with travel recommendations based on their travel blog entries.
      If the user has any follow up questions related to travel, you will provide as accurate information as possible 
      from your general knowledge.
      If the question is not about travel, you will call the return_error function with a reason why 
      the question is not about travel.
      `
  };

  let currentChat: InstanceType<typeof Chat>;

  if (chatId) {
    currentChat = (await Chat.findById(chatId)) || (await Chat.create({ history: [systemPrompt] }));
  } else {
    currentChat = await Chat.create({ history: [systemPrompt] });
  }

  // add user message to database history
  currentChat.history.push({
    role: 'user',
    content: `${prompt}`
  });

  const client = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env?.AI_URL
  });

  const model = process.env.AI_MODEL || 'gemini-2.5-flash';

  // Step 1: Check if the prompt is about travel
  const checkIntentCompletion = await client.chat.completions.create({
    model,
    tools,
    tool_choice: 'auto',
    messages: JSON.parse(JSON.stringify(currentChat.history)),
    temperature: 0
  });

  console.log(checkIntentCompletion);

  // Check if the completion has a message
  const checkIntentCompletionMessage = checkIntentCompletion.choices[0]?.message;
  // Throw an error if no message is found
  if (!checkIntentCompletionMessage) {
    throw new Error(`Failed to generate a response from the model.`, { cause: { status: 500 } });
  }
  console.log(checkIntentCompletionMessage);
  currentChat.history.push(checkIntentCompletionMessage);

  if (checkIntentCompletionMessage.tool_calls) {
    for (const toolCall of checkIntentCompletionMessage.tool_calls || []) {
      if (toolCall.type === 'function') {
        const name = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        console.log(
          `\x1b[36mTool call detected: ${name} with args: ${JSON.stringify(args)}\x1b[0m`
        );
        let result: PostDTO | ErrorResponseDTO | string = '';
        if (name === 'get_posts') {
          result = await getPosts({ userId: args.userId });
        }
        if (name === 'return_error') {
          result = await returnError({ message: args.message });
        }

        currentChat.history.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        });
      }
    }
  }
  // else {
  //   res.json({
  //     completion:
  //       checkIntentCompletionMessage?.content ||
  //       'Sorry, something went wrong. Please repeat the question',
  //     chatId: currentChat._id.toString()
  //   });
  //   return;
  // }

  const completion = await client.chat.completions.create({
    model: process.env.AI_MODEL || 'gemini-2.0-flash',
    // stringifying and then parsing is like using .lean(). It will turn currentChat into a plain JavaScript Object
    // We don't use .lean(), because we later need to .save()
    messages: JSON.parse(JSON.stringify(currentChat.history))
  });

  // console.log(completion);
  const completionText = completion.choices[0]?.message.content || 'No completion generated';

  currentChat.history.push({ role: 'assistant', content: completionText });

  await currentChat.save();

  res.json({ completion: completionText, chatId: currentChat._id.toString() });
};
