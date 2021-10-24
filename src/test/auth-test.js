//////Test packages//////
const test = require('ava')
const request = require('supertest')

const app = require('../../app')

const UserModel = require('../models/user-model')

const bcrypt = require('bcryptjs')

test.serial('Register user', async t => {
    await UserModel.deleteMany({})

    //Create user model
    const userToCreate = {
        firstName: 'Salih',
        lastName: 'Simseeeek',
        email: 'user@user.com',
        password: 'user12345',
        c_password: 'user12345',
        phone: '9999999999'
    }

    //Create user
    const createdUser = await request(app).post('/api/auth/register').send(userToCreate)

    //Check for server response after create user
    t.is(createdUser.status, 201)

    //Create not valid user model (Short password)
    const notValidUserForCreate = {
        firstName: 'Salih',
        lastName: 'Simsek',
        email: 'user@user.com',
        password: 'user123',
        c_password: 'user123',
        phone: '9999999999'
    }

    //Create user with short password
    const shortPassUser = await request(app).post('/api/auth/register').send(notValidUserForCreate)

    //Get error from object
    const error = JSON.parse(shortPassUser.text)

    t.is(error.message, '"password" length must be at least 8 characters long')
    t.is(shortPassUser.status, 400)

    //Check email already exist
    const emailExistUser = {
        firstName: 'Salih',
        lastName: 'Simsek',
        email: 'user@user.com',
        password: 'user123454',
        c_password: 'user123454',
        phone: '9876543215'
    }

    const createdEmailExistUser = await request(app).post('/api/auth/register').send(emailExistUser)

    let existEmailError = JSON.parse(createdEmailExistUser.error.text)

    t.is(existEmailError.message, "Email already in use")
    t.is(createdEmailExistUser.status, 400)

    //Check phone number already exist
    const phoneExistUser = {
        firstName: 'Salih',
        lastName: 'Simsek',
        email: 'user@userr.com',
        password: 'user123454',
        c_password: 'user123454',
        phone: '9999999999'
    }

    const createdPhoneExistUser = await request(app).post('/api/auth/register').send(phoneExistUser)

    let phoneExistError = JSON.parse(createdPhoneExistUser.error.text)

    t.is(phoneExistError.message, "Phone number already in use")
    t.is(createdEmailExistUser.status, 400)
})

test('Login user', async t => {
    await UserModel.deleteMany({})
    //Create user model
    const userToCreate = {
        firstName: 'Salih',
        lastName: 'Simseeeek',
        email: 'user@user.com',
        password: 'user12345',
        c_password: 'user12345',
        phone: '9999999999'
    }

    //Create user
    const createdUser = await request(app).post('/api/auth/register').send(userToCreate)

    //Check for server response after create user
    t.is(createdUser.status, 201)

    //Create user model
    const loginUser = {
        email: 'user@user.com',
        password: 'user12345',
    }

    //Create user
    const loggedInUser = await request(app).post('/api/auth/login').send(loginUser)

    //Check for server response after create user
    t.is(loggedInUser.status, 200)

    //Wrong password check
    const wrongPassUser = {
        email: 'user@user.com',
        password: 'user123456789',
    }

    const wrongPassUserResponse = await request(app).post('/api/auth/login').send(wrongPassUser)

    t.is(wrongPassUserResponse.status, 401)

    //Wrong email password check
    const wrongEmailUser = {
        email: 'userr@user.com',
        password: 'user12345'
    }

    const wrongEmailUserResponse = await request(app).post('/api/auth/login').send(wrongEmailUser)

    t.is(wrongEmailUserResponse.status, 401)
})