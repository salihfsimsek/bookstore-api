const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(`${process.env.DB}`)
        console.log('Connected to db')
    } catch (err) {
        console.log('Error connecting to db')
    }
}

module.exports = main