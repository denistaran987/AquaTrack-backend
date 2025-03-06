import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
  amount: Joi.number().required(),
  hours: Joi.number().integer().min(0).max(23).optional(),
  minutes: Joi.number().integer().min(0).max(59).optional(),
  date: Joi.date().optional(),
  owner: Joi.string(),
});

export const updateWaterRecordSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().optional(),
});
