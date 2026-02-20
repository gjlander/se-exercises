import type { z } from 'zod';
import type { promptSchema } from '#schemas';

export type PromptDTO = z.infer<typeof promptSchema>;

export type ErrorResponseDTO = {
  success: false;
  error: string;
};

export type PostDTO = {
  title: string;
  content: string;
};
