import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import waterRouter from './water.js';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.use('/water', authenticate, waterRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
