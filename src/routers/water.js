import {Router} from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getDayWaterContoller, getMonthWaterContoller } from "../controllers/water.js";

const waterRouter = Router();

waterRouter.get(
  '/day',
  ctrlWrapper(getDayWaterContoller),
);
waterRouter.get(
  '/month',
  ctrlWrapper(getMonthWaterContoller),
);

export default waterRouter;