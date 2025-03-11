import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  gender: Joi.string().valid('male', 'female'),
  weight: Joi.number().min(0).max(250),
  dailySportTime: Joi.number().min(0).max(24),
  dailyNorm: Joi.number().min(500).max(5000),
});
