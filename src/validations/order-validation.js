const Joi = require('joi')

const orderValidation = Joi.object({
    items: Joi.array().required(),
    status: Joi.string().valid("Draft", "Pending", "Completed", "Canceled", "Shipped").required(),
    amount: Joi.number(),
    user: Joi.string()
})

module.exports = { orderValidation }