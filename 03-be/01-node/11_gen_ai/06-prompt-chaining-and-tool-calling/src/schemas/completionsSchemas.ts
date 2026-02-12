import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

export const promptBodySchema = z.object({
  prompt: z
    .string()
    .min(1, 'Prompt cannot be empty')
    .max(1000, 'Prompt cannot exceed 1000 characters'),
  stream: z.boolean().optional().default(false),
  chatId: z
    .string()
    .refine(val => isValidObjectId(val))
    .nullish()
});

export const Intent = z.object({
  isPokemon: z.boolean(),
  type: z.string(),
  pokemonName: z.string(),
  reason: z.string()
});

export const FinalResponse = z.object({
  isPokemon: z.boolean(),
  pokemonInfo: z
    .object({
      id: z.number(),
      name: z.string(),
      aboutSpecies: z.string(),
      types: z.array(z.string()),
      abilities: z.array(z.string()),
      abilitiesExplained: z.string(),
      frontSpriteURL: z.string()
    })
    .optional()
    .nullable(),
  error: z.string().optional().nullable()
});
