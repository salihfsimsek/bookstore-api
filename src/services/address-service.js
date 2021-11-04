const BaseService = require('./base-service')
const AddressModel = require('../models/address-model');

class AddressService extends BaseService {
    model = AddressModel

    async findMyAddresses(object) {
        return this.model.find(object)
    }
}

module.exports = new AddressService();