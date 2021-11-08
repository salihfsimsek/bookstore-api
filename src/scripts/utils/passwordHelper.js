const bcrypt = require('bcryptjs')

const passwordToHash = async (password) => {
    //Encryption
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

module.exports = { passwordToHash }