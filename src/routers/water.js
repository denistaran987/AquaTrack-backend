import {Router} from "express";
import { getDayWaterContoller, getMonthWaterContoller } from "../controllers/water";

const router = Router();

router.get(
  '/day',
  ctrlWrapper(getDayWaterContoller),
);
router.get(
  '/month',
  ctrlWrapper(getMonthWaterContoller),
);

export default router;