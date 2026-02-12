import { Router } from 'express';
import { createInMemoryChat } from '#controllers';
import { validateBody } from '#middleware';
import { promptSchema } from '#schemas';

const completionRoute = Router();

completionRoute.post('/in-memory-chat', validateBody(promptSchema), createInMemoryChat);

export default completionRoute;
