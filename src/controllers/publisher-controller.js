const PublisherService = require('../services/publisher-service')

const createPublisher = async (req, res) => {
    try {
        const createdPublisher = await PublisherService.create(req.body)
        res.status(201).send(createdCategory)
    } catch (err) {
        res.status(400).send(err)
    }
}

const deletePublisher = async (req, res) => {
    try {
        await PublisherService.delete(req.params.id)
        res.status(200).send({ 'message': 'Publisher deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const getPublisher = async (req, res) => {
    try {
        const publisher = await PublisherService.find({ _id: req.params.id })
        res.status(200).send(publisher)
    } catch (err) {
        res.status(404).send(err)
    }
}

const getAllPublishers = async (req, res) => {
    try {
        const publishers = await PublisherService.findAll()
        res.status(200).send(publishers)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { createPublisher, deletePublisher, getPublisher, getAllPublishers }