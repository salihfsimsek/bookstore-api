const httpStatus = require('http-status')

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body)

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ')
        return res.status(httpStatus.BAD_REQUEST).send({ error: errorMessage })
    }
    next()
}

module.exports = validate