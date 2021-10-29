//////Test packages//////
const test = require('ava')
const request = require('supertest')
// const sinon = require('sinon')
const jwt = require('jsonwebtoken')

const app = require('../../app')

const PublisherModel = require('../models/publisher-model')

test('Create publisher', async t => {

    const publisher = {
        name: 'New Publisher'
    }

    // const token = 'token';
    const createdPublisher = await request(app).post('/api/publisher/').set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg1ZTc2MmI2OWFjMmY5YzA4MGFkYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzNTI3ODQ1OH0.1TACNftDTQ8AH2vYfDVRz2xd1QdkfAqSJVWSIPfNro4' }).send(publisher)
    console.log(createdPublisher)
})

test.todo('Update publisher')

test.todo('get publisher')

test.todo('get publishers')

test.todo('delete publisher')

// test.after('cleanup', t => {
//     stub.restore()
// })