import { Router } from 'express';
import { createCompletion, createAgentCompletion } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { PromptBodySchema } from '#schemas';

const completionsRouter = Router();
completionsRouter.use(validateBodyZod(PromptBodySchema));

completionsRouter.post('/chained-prompt', createCompletion);
completionsRouter.post('/agent', createAgentCompletion);

export default completionsRouter;
