const db = require('./db')
const emailReportTask = require('./cron')

module.exports = () => {
    db()
    emailReportTask.start()
}