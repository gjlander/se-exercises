import type { RequestHandler } from 'express';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';
import type { z } from 'zod';
import { createOpenAICompletion } from '#utils';
import type { promptBodySchema } from '#schemas';
import OpenAI from 'openai';

type IncomingPrompt = z.infer<typeof promptBodySchema>;
type ResponseCompletion = { completion: string };

export const createOllamaCompletion: RequestHandler<
  unknown,
  ResponseCompletion,
  IncomingPrompt
> = async (req, res) => {
  const { prompt } = req.body;
  console.log(process.env.NODE_ENV);
  const client = new OpenAI({
    apiKey:
      process.env.NODE_ENV === 'development'
        ? process.env.OLLAMA_API_KEY
        : process.env.OPENAI_API_KEY,
    baseURL: process.env.NODE_ENV === 'development' ? process.env.OLLAMA_URL : undefined
  });
  const completion = await client.chat.completions.create({
    model: 'llama3.1:8b',
    messages: [
      { role: 'developer', content: 'You are a helpful assisstant' },
      { role: 'user', content: prompt }
    ]
  });
  res
    .status(200)
    .json({ completion: completion.choices[0]?.message.content || 'No completion generated' });
};

export const createLMSCompletion: RequestHandler<
  unknown,
  ResponseCompletion,
  IncomingPrompt
> = async (req, res) => {
  const { prompt, stream } = req.body;
  // Create OpenAI client with LMS settings
  const client = new OpenAI({
    apiKey:
      process.env.NODE_ENV === 'development' ? process.env.LMS_API_KEY : process.env.OPENAI_API_KEY,
    baseURL: process.env.NODE_ENV === 'development' ? process.env.LMS_URL : undefined
  });
  // Prepare the base request for LMS
  const baseRequest: ChatCompletionCreateParamsNonStreaming = {
    model:
      process.env.NODE_ENV === 'development' ? process.env.LMS_MODEL! : process.env.OPENAI_MODEL!,
    messages: [
      { role: 'developer', content: 'You are a helpful assisstant' },
      { role: 'user', content: prompt }
    ]
  };
  // Utility function takes care of streaming or non-streaming completions
  await createOpenAICompletion(client, res, baseRequest, stream);
};
