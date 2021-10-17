const CategoryService = require('../services/category-service')

const createCategory = async (req, res) => {
    try {
        const createdCategory = await CategoryService.create(req.body)
        res.status(201).send(createdCategory)
    } catch (err) {
        res.status(400).send(err)
    }
}

const deleteCategory = async (req, res) => {
    try {
        await CategoryService.delete(req.params.id)
        res.status(200).send({ 'message': 'Category deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await CategoryService.find({ _id: req.params.id })
        res.status(200).send(category)
    } catch (err) {
        res.status(404).send(err)
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.findAll()
        res.status(200).send(categories)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { createCategory, deleteCategory, getCategory, getAllCategories }