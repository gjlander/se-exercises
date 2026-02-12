import { Router } from 'express';
import { createInMemoryChat, createChat, getChatHistory } from '#controllers';
import { validateBody } from '#middleware';
import { promptSchema } from '#schemas';

const completionRoutes = Router();

completionRoutes.get('/history/:id', getChatHistory);

completionRoutes.post('/in-memory-chat', validateBody(promptSchema), createInMemoryChat);
completionRoutes.post('/chat', validateBody(promptSchema), createChat);

export default completionRoutes;
