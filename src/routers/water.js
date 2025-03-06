import { Router } from 'express';

import {
  addWaterController,
  updateWaterController,
  deleteWaterController,
} from '../controllers/water.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';

import { addWaterRecordSchema, updateWaterRecordSchema } from '../validation/water.js';

const router = Router();

router.post('/', validateBody(addWaterRecordSchema), ctrlWrapper(addWaterController));

router.patch('/:id', validateBody(updateWaterRecordSchema), ctrlWrapper(updateWaterController));

router.delete('/:id', ctrlWrapper(deleteWaterController));

export default router;
