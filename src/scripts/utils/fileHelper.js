const multer = require('multer')
const upload = multer({ dest: __dirname + '/upload/images' })

module.exports = { upload }