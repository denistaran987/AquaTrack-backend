import { Router } from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getDayWaterContoller, getMonthWaterContoller } from "../controllers/water.js";
import {
  addWaterController,
  updateWaterController,
  deleteWaterController,
} from '../controllers/water.js';


import { validateBody } from '../middlewares/validateBody.js';

import { addWaterSchema, updateWaterSchema } from '../validation/water.js';

const waterRouter = Router();

waterRouter.post('/', validateBody(addWaterSchema), ctrlWrapper(addWaterController));

waterRouter.patch('/:id', validateBody(updateWaterSchema), ctrlWrapper(updateWaterController));

waterRouter.delete('/:id', ctrlWrapper(deleteWaterController));

waterRouter.get(
  '/day',
  ctrlWrapper(getDayWaterContoller),
);
waterRouter.get(
  '/month',
  ctrlWrapper(getMonthWaterContoller),
);

export default waterRouter;

