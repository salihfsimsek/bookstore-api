const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book'
    }]
})

const AuthorModel = mongoose.Model('Author', AuthorSchema)

module.exports = AuthorModel