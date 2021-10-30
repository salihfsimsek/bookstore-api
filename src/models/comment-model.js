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
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    }
},{timestamps: true})

CommentSchema.plugin(require('mongoose-autopopulate'))

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel