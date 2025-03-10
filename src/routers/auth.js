import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  countUsersController,
  loginUserController,
  logoutUserController,
  registerUserController,
  resetEmailController,
  resetPasswordController,
  refreshUserSessionController,
} from '../controllers/auth.js';

const authRouter = Router();
authRouter.post('/signup', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post('/signin', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
authRouter.get('/totalUsers', ctrlWrapper(countUsersController));
authRouter.post(
  '/send-reset-email',
  validateBody(resetEmailSchema),
  ctrlWrapper(resetEmailController),
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
