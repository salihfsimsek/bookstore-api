const Joi = require('joi')

const publisherValidation = Joi.object({
    name: Joi.string().required(),
    books: Joi.array()
})

module.exports = { publisherValidation }