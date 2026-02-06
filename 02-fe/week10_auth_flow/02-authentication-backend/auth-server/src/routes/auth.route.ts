import { Router } from 'express';
import { login, logout, me, refresh, register } from '#controllers';
import { validateZod } from '#middlewares';
import { loginSchema, registerSchema } from '#schemas';

const authRouter = Router();

authRouter.post('/register', validateZod(registerSchema), register);

authRouter.post('/login', validateZod(loginSchema), login);

authRouter.post('/refresh', refresh);

authRouter.delete('/logout', logout);

authRouter.get('/me', me);

export default authRouter;
