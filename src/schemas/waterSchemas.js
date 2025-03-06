import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().optional(),
  owner: Joi.string(),
});
export const updateWaterRecordSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().optional(),
});
