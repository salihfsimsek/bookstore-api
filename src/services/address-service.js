const BaseService = require('./base-service')
const AddressModel = require('../models/AddressModel');

class AddressService extends BaseService {
    model = AddressModel
}

module.exports = new AddressService();