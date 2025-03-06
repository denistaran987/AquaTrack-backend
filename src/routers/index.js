import { Router } from 'express';
import { authenticate } from "../middlewares/authenticate.js";
import waterRouter from './water.js';


const router = Router();

router.use('/water', authenticate, waterRouter);

export default router;
