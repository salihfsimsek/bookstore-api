const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        require: true
    }
})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel