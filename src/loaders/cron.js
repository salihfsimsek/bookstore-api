const cron = require('node-cron');
const axios = require('axios')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2MxZmEwNzEwOTA3NTYwODJlNWNkMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzNTUyNDY5Nn0.eRYBQQe554s_ln9QOv-fQxyL5KK65H4QHhkZiuqKdKg'

const emailReportTask = cron.schedule('04 17 * * *', () => {
    axios.get('http://127.0.0.1:3001/api/order/statistical/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(result => console.log(result.data))
})

module.exports = emailReportTask