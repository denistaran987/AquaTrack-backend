import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addWaterSchema, updateWaterSchema } from '../validation/water.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  addWaterController,
  updateWaterController,
  deleteWaterController,
  getDayWaterController,
  getMonthWaterController,
} from '../controllers/water.js';

const waterRouter = Router();

waterRouter.post('/', validateBody(addWaterSchema), ctrlWrapper(addWaterController));
waterRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterController),
);
waterRouter.delete('/:id', isValidId, ctrlWrapper(deleteWaterController));
waterRouter.get('/day', ctrlWrapper(getDayWaterController));
waterRouter.get('/month', ctrlWrapper(getMonthWaterController));

export default waterRouter;
