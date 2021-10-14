const BaseService = require('./base-service')
const AuthorModel = require('../models/author-model')

class AuthorService extends BaseService {
    model = AuthorModel
}

module.export = new AuthorService()