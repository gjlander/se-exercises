import type { z } from 'zod/v4';
import type { promptBodySchema } from '#schemas';

export type IncomingPrompt = z.infer<typeof promptBodySchema>;

export type ErrorResponseDTO = {
  success: false;
  error: string;
};

export type PostDTO = {
  title: string;
  content: string;
};
