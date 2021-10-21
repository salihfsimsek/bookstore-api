const CommentService = require('../services/comment-service')
const BookService = require('../services/book-service')

const createComment = async (req, res) => {
    try {
        //Add request user to comment object
        let newComment = { ...req.body, user: req.user.id }
        const createdComment = await CommentService.create(newComment)

        //Update the comment list of the book
        const book = await BookService.find({ _id: req.body.book })

        //Add comment to book's comment list
        book.comments.push(createdComment)
        await book.save()

        res.status(201).send(createdComment)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteComment = async (req, res) => {
    try {
        await CommentService.delete(req.params.id)
        res.status(200).send({ 'message': 'Comment deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateComment = async (req, res) => {
    try {
        const updatedComment = CommentService.update({ _id: req.params.id }, req.body)
        res.status(201).send(updatedComment)
    } catch (err) {
        res.status(400).send(err)
    }
}


module.exports = { createComment, deleteComment, updateComment }