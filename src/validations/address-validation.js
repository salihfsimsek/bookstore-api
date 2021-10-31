const Joi = require('joi');

const addressValidation = Joi.object({
    country: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    addressLine: Joi.string().required(),
    user: Joi.string().required(),
})

module.exports = { addressValidation }