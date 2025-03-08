import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  countUsersController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();
authRouter.post('/signup', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/signin', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.get('/total-users', ctrlWrapper(countUsersController));

export default authRouter;
