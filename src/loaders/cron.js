const cron = require('node-cron');

var task = cron.schedule('40 22 * * *', () => {
    console.log('Cron job worked')
})

module.exports = task