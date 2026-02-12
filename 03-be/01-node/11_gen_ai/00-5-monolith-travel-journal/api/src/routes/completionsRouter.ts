import { Router } from 'express';
import { createAgenticChat, getChatHistory } from '#controllers';
import { validateZod, authenticate } from '#middlewares';
import { promptBodySchema } from '#schemas';

const completionsRouter = Router();
completionsRouter.get('/history/:id', getChatHistory);

completionsRouter.post('/agent', validateZod(promptBodySchema), authenticate('lax'), createAgenticChat);

export default completionsRouter;
