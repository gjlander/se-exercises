import Joi from 'joi';

// Define an schema. A template for an object
const userSchema = Joi.object({
    title: Joi.string().min(3).max(256).required(),
    content: Joi.string().min(3).max(10000).required(),
    userId: Joi.number().integer().min(1).required(),
});

export default userSchema;
