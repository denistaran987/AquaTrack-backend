import Joi from "joi";

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('woman', 'man').required(),
});
