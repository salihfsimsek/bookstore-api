const Joi = require('joi')

const userUpdateValidation = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8),
    role: Joi.string()
})

const userRoleUpdateValidation = Joi.object({
    role: Joi.string().required()
})

module.exports = { userUpdateValidation, userRoleUpdateValidation }