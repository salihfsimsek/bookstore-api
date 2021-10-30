const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        autopopulate: {
            maxDepth: 1
        },
    }]
}, { timestamps: true })

CategorySchema.plugin(require('mongoose-autopopulate'))

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel