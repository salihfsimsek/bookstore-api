const BookService = require('../services/book-service')
const AuthorService = require('../services/author-service')
const CategoryService = require('../services/category-service')
const PublisherService = require('../services/publisher-service')

const createBook = async (req, res) => {
    try {
        //Find author category and publisher
        const author = await AuthorService.find({ _id: req.body.author })
        const category = await CategoryService.find({ _id: req.body.category })
        const publisher = await PublisherService.find({ _id: req.body.publisher })

        //Save file path to new array and send new array to book
        req.body.images = req.files.map(file => file.path)
        // Create new book
        const createdBook = await BookService.create(req.body)

        //Update author's book list, category's book list and publisher's book list
        author.books.push(createdBook)
        category.books.push(createdBook)
        publisher.books.push(createdBook)

        //Save all changes
        await author.save()
        await category.save()
        await publisher.save()

        res.status(201).send(createdBook)
    } catch (err) {
        res.status(400).send(err.response)
    }
}

const deleteBook = async (req, res) => {
    try {
        const book = await BookService.find({ _id: req.params.id })
        const { deletedCount } = await BookService.delete(req.params.id)
        if (deletedCount === 1) {
            //When the book deleted remove the book from the other lists
            await CategoryService.update({ _id: book.category.id }, { $pull: { books: book._id } })
            await AuthorService.update({ _id: book.author.id }, { $pull: { books: book._id } })
            await PublisherService.update({ _id: book.publisher.id }, { $pull: { books: book._id } })
        } else {
            return res.status(404).send({ 'message': "Something wrong" })
        }
        res.status(200).send({ 'message': 'Book deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateBook = async (req, res) => {
    try {
        //Get the book to be update
        const book = await BookService.find({ _id: req.params.id })

        //When book's category and req.body.category were different, remove book from category's book list 
        if (book.category.id !== req.body.category) {
            await CategoryService.update({ _id: book.category.id }, { $pull: { books: book._id } })
            await CategoryService.update({ _id: req.body.category }, { $push: { books: book._id } })
        }

        //When book's author and req.body.author were different, remove book from author's book list 
        if (book.author.id !== req.body.author) {
            await AuthorService.update({ _id: book.author.id }, { $pull: { books: book._id } })
            await AuthorService.update({ _id: req.body.author }, { $push: { books: book._id } })
        }

        //When book's publisher and req.body.publisher were different, remove book from publisher's book list 
        if (book.publisher.id !== req.body.publisher) {
            await PublisherService.update({ _id: book.publisher.id }, { $pull: { books: book._id } })
            await PublisherService.update({ _id: req.body.publisher }, { $push: { books: book._id } })
        }

        const updatedBook = await BookService.update({ _id: req.params.id }, req.body)

        res.status(201).send(updatedBook)
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