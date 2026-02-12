import type { userSchema, postSchema, signInSchema } from '#schemas';
import type { z } from 'zod/v4';
import type { Post } from '#models';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
      };
      post?: InstanceType<typeof Post>;
    }
  }
}
