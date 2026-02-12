import { Router } from 'express';
import { createInMemoryChat, createChat, getChatHistory } from '#controllers';
import { validateBody } from '#middleware';
import { promptSchema, promptWithIdSchema } from '#schemas';

const completionRoute = Router();
completionRoute.get('/history/:id', getChatHistory);

completionRoute.post('/in-memory-chat', validateBody(promptSchema), createInMemoryChat);
completionRoute.post('/chat', validateBody(promptWithIdSchema), createChat);

export default completionRoute;
