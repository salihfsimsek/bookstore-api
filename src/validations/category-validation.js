const Joi = require('joi')

const categoryValidation = Joi.object({
    title: Joi.string().required(),
    books: Joi.array()
})

module.exports = { categoryValidation }