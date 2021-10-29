const Joi = require('joi')

const authorValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    books: Joi.array()
})

module.exports = { authorValidation }
