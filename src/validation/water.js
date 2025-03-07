import Joi from 'joi';

export const addWaterSchema = Joi.object({
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .required()
    .example('2025-01-05T17:20:38.936Z')
    .description('Water card creation date in ISO 8601 format'),
  amount: Joi.number()
    .min(0) 
    .max(5000)
    .required()
    .example(50)
    .description('Volume of water in milliliters')
});


export const updateWaterSchema = Joi.object({
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .required()
    .example('2025-01-05T17:20:38.936Z')
    .description('Water card creation date in ISO 8601 format'),
  amount: Joi.number()
    .min(0) 
    .max(5000)
    .required()
    .example(50)
    .description('Volume of water in milliliters')
});



