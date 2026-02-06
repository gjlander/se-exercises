import type { z } from 'zod';
import type { FinalResponse, promptBodySchema } from '#schemas';

export type IncomingPrompt = z.infer<typeof promptBodySchema>;

export type ErrorResponseDTO = {
  success: false;
  error: string;
};
export type FinalResponseDTO =
  | z.infer<typeof FinalResponse>
  | ErrorResponseDTO
  | { completion: string };

export type PostDTO = {
  title: string;
  content: string;
};
