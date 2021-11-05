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
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Author',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    publisher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Publisher',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        // autopopulate: {
        //     maxDepth: 1
        // },
    }]
}, { timestamps: true })

BookSchema.plugin(require('mongoose-autopopulate'))

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel