const AddressService = require('../services/address-service')

const createAddress = async (req, res) => {
    try {
        const createdAddress = await AddressService.create(req.body)
        res.status(201).send(createdAddress)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

const deleteAddress = async (req, res) => {
    try {
        await AddressService.delete(req.params.id)
        res.status(200).send({ 'message': 'Address deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateAddress = async (req, res) => {
    try {
        const updatedAddress = await AddressService.update({ _id: req.params.id }, req.body)
        res.status(201).send(updatedAddress)
    } catch (err) {
        res.status(400).send(err)
    }
}

const getAddress = async (req, res) => {
    try {
        const address = await AddressService.find({ _id: req.params.id })
        res.status(200).send(address)
    } catch (err) {
        res.status(404).send(err)
    }
}

const getAllAddress = async (req, res) => {
    try {
        const address = await AddressService.findAll()
        res.status(200).send(address)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { createAddress, deleteAddress, updateAddress, getAddress, getAllAddress }