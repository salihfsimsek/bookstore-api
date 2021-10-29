const Joi = require('joi');

const registerValidation = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).required(),
    c_password: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string()
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

module.exports = { registerValidation, loginValidation }