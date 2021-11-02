const db = require('./db')
const task = require('./cron')

module.exports = () => {
    db()
    task.start()
}