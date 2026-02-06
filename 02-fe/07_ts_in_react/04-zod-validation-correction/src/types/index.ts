import { z } from 'zod/v4';
import { ProductSchema } from '../schemas';

export type Product = z.infer<typeof ProductSchema>;
