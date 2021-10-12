const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect('mongodb://localhost/library-api')
        console.log('Connected to db')
    } catch (err) {
        console.log('Error connecting to db')
    }
}

main()