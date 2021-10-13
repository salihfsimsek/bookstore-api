const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel