const Joi = require('joi')

const bookValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ISBN: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    publisher: Joi.string().required(),
    images: Joi.string(),
    comments: Joi.array()
})

module.exports = { bookValidation }