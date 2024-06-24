import Joi from 'joi';

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required()
});

const userIdSchema = Joi.object({
    userId: Joi.string().required()
});

export {
    userSchema,
    userIdSchema
};
