const AuthorService = require('../services/author-service')

const createAuthor = async (req, res) => {
    try {
        const createdAuthor = await AuthorService.create(req.body)
        res.status(201).send(createdAuthor)
    } catch (err) {
        res.status(400).send(err)
    }
}

const deleteAuthor = async (req, res) => {
    try {
        await AuthorService.delete(req.params.id)
        res.status(200).send({ 'message': 'Author deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await AuthorService.update({ _id: req.params.id }, req.body)
        res.status(201).send(updatedAuthor)
    } catch (err) {
        res.status(400).send(err)
    }
}

const getAuthor = async (req, res) => {
    try {
        const author = await AuthorService.find({ _id: req.params.id })
        res.status(200).send(author)
    } catch (err) {
        res.status(404).send(err)
    }
}

const getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorService.findAll()
        res.status(200).send(authors)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { createAuthor, deleteAuthor, updateAuthor, getAuthor, getAllAuthors }