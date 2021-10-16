class BaseService {
    //Find all
    async findAll() {
        return this.model.find()
    }

    //Find spesific one
    async find(object) {
        return this.model.findOne(object)
    }

    //create
    async create(item) {
        return this.model.create(item)
    }

    //update
    async update(id, object) {
        return this.model.findOneAndUpdate(id, object, { new: true })
    }

    //delete
    async delete(id) {
        return this.model.deleteOne({ _id: id })
    }
}

module.exports = BaseService