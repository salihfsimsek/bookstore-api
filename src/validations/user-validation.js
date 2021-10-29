const Joi = require('joi')

const userUpdateValidation = Joi.schema({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string()
})

const userRoleUpdateValidation = Joi.schema({
    role: Joi.string().required()
})

module.exports = { userUpdateValidation, userRoleUpdateValidation }