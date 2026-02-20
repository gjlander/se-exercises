import type { ChatCompletionTool } from 'openai/resources';
import type { ErrorResponseDTO, PostDTO } from '#types';
import { Post } from '#models';

export const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      strict: true,
      name: 'get_posts',
      description: 'Get the travel blog posts from a user',
      parameters: {
        type: 'object',
        description: 'The id of the user to get posts for',
        properties: {
          userId: {
            type: 'string',
            description: 'The id of the user to get posts for',
            example: 'Pikachu'
          }
        },
        required: ['userId'],
        additionalProperties: false
      }
    }
  },
  {
    type: 'function',
    function: {
      strict: true,
      name: 'return_error',
      description: 'Return an error when the user asks something that is NOT about the weather.',
      parameters: {
        type: 'object',
        description: 'The reason why the question is not about Pokémon',
        properties: {
          message: {
            type: 'string',
            description: 'The reason why the question is not about Pokémon',
            example: 'This question is not about Pokémon.'
          }
        },
        required: ['message'],
        additionalProperties: false
      }
    }
  }
];

export const getPosts = async ({ userId }: { userId?: string }): Promise<PostDTO> => {
  console.log(`\x1b[35mFunction get_posts called with: ${userId}\x1b[0m`);
  const userPosts = await Post.find({ author: userId })
    .select('title content -_id')
    .lean<PostDTO>();
  return userPosts;
};

export const returnError = async ({ message }: { message: string }): Promise<ErrorResponseDTO> => {
  console.error(`\x1b[31mError: ${message}\x1b[0m`);
  return {
    success: false,
    error: message
  };
};
