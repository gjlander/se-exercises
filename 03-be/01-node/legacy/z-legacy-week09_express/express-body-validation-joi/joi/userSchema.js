import Joi from 'joi';

// Define an schema. A template for an object
const userSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
});

export default userSchema;
