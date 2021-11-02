const cron = require('node-cron');

var task = cron.schedule('52 22 * * *', () => {
    console.log('22:52')
})

module.exports = task