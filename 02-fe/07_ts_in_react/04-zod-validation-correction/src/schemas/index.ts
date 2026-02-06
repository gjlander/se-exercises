import { z } from 'zod/v4';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  price: z.number().min(0),
  thumbnail: z.url({ protocol: /^http$/ }),
});

export const ProductSchemaArray = z.array(ProductSchema);
