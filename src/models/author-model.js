const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book'
    }]
})

const AuthorModel = mongoose.Model('Author', AuthorSchema)

module.exports = AuthorModel