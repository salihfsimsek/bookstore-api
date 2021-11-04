const AddressService = require('../services/address-service')
const UserService = require('../services/user-service')

const createAddress = async (req, res) => {
    try {
        const currentUser = await UserService.find({ _id: req.user.id })
        req.body.user = req.user.id
        const createdAddress = await AddressService.create(req.body)
        currentUser.address.push(createdAddress)
        await currentUser.save()
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

//Personal addresses for client
const getAllAddresses = async (req, res) => {
    try {
        const addresses = await AddressService.findMyAddresses({ user: req.user.id })
        res.status(200).send(addresses)
    } catch (err) {
        res.status(400).send(err)
    }
}

//Get all addresses for admin and manager
const getAllAddressesForManager = async (req, res) => {
    try {
        const addresses = await AddressService.findAll()
        res.status(200).send(addresses)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { createAddress, deleteAddress, updateAddress, getAddress, getAllAddresses, getAllAddressesForManager }