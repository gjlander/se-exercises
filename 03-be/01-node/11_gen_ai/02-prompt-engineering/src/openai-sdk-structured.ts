import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';

export async function openaiSdkStructured(prompt: string) {
	const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	const ProductSchema = z.object({
		product_name: z.string(),
		category: z.string(),
		price: z.number()
	});

	const response = await client.responses.parse({
		model: 'gpt-4o-mini',
		instructions:
			'You are a structured data extractor. Extract the fields from the description in the input',
		input: prompt,
		text: {
			format: zodTextFormat(ProductSchema, 'ProductSchema')
		}
	});
	return response.output_parsed;
}
