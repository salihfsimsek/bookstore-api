const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    ISBN: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Author',
        require: true
    },
    publisher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Publisher',
        require: true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
    }]
})

const BookModel = mongoose.Model('Book', BookSchema)

module.exports = BookModel