import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { refreshUserSessionController } from "../controllers/auth.js";

const router = Router();

router.post("/refresh", ctrlWrapper(refreshUserSessionController));
