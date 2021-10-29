const Joi = require('joi')

const commentValidation = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(5).required(),
    book: Joi.string().required(),
    user: Joi.string().required(),
})

module.exports = { commentValidation }