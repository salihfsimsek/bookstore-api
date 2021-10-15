const Joi = require('joi');
const bcrypt = require('bcryptjs');
const UserService = require('../services/user-service')

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().min(8).required(),
        c_password: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string()
    })
    return schema.validate(data)
}

module.exports = { registerValidation }