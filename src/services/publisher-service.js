const BaseService = require('./base-service')
const PublisherModel = require('../models/publisher-model')

class PublisherService extends BaseService {
    model = PublisherModel
}

module.exports = new PublisherService()