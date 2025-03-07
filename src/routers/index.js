import { Router } from 'express';
import authRouter from "./auth.js";
import userRouter from "./user.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
