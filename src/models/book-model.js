const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Author',
        required: true
    },
    publisher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Publisher',
        required: true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
    }]
})

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel