const BookService = require('../services/book-service')
const AuthorService = require('../services/author-service')
const CategoryService = require('../services/category-service')
const PublisherService = require('../services/publisher-service')
const createBook = async (req, res) => {
    try {
        //Find author category and publisher
        const author = await AuthorService.find({ _id: req.body.author })
        const category = await CategoryService.find({ _id: req.body.category })
        // const publisher = await PublisherService.find({ _id: req.body.publisher })

        //Create new book
        const createdBook = await BookService.create(req.body)

        //Update author's book list, category's book list and publisher's book list
        author.books.push(createdBook)
        category.books.push(createdBook)
        // publisher.books.push(createdBook)

        //Save all changes
        await author.save()
        await category.save()
        // await publisher.save()

        res.status(201).send(createdBook)
    } catch (err) {
        res.status(400).send(err.response)
    }
}

const deleteBook = async (req, res) => {
    try {
        await BookService.delete(req.params.id)
        res.status(200).send({ 'message': 'Book deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateBook = async (req, res) => {
    try {
        //Get the book to be update
        const book = await BookService.find({ _id: req.params.id })
        if (book.category.id !== req.body.category) {
            const category = await CategoryService.find({ _id: book.category.id })
            category.books.pull(book._id)
            await category.save()
        }

        // const updatedBook = await BookService.update({ _id: req.params.id }, req.body)
        res.status(201).send(book)
    } catch (err) {
        res.status(400).send(err)
    }
}

const getBook = async (req, res) => {
    try {
        const book = await BookService.find({ _id: req.params.id })
        res.status(200).send(book)
    } catch (err) {
        res.status(404).send(err)
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await BookService.findAll()
        res.status(200).send(books)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

module.exports = { createBook, deleteBook, updateBook, getBook, getAllBooks }