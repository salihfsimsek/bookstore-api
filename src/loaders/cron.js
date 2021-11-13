const cron = require('node-cron');
const axios = require('axios')
const { convertJSONtoExcel } = require('../scripts/utils/xlsxHelper')
const { mailHelper } = require('../scripts/utils/mailHelper')

const emailReportTask = cron.schedule('30 22 * * *', () => {
    axios.get('http://127.0.0.1:3001/api/order/statistical/', {
        headers: {
            Authorization: `Bearer ${process.env.FAKE_TOKEN}`
        }
    }).then(result => {
        convertJSONtoExcel(result.data.lastThirtyDays, 'Last30Days')
        convertJSONtoExcel(result.data.lastSevenDays, 'Last7Days')
        convertJSONtoExcel(result.data.lastDay, 'LastDay')
    })
    mailHelper([
        {
            filename: 'Last30Days.xlsx', path: 'reports/Last30Days.xlsx'
        },
        {
            filename: 'Last7Days.xlsx', path: 'reports/Last7Days.xlsx'
        },
        {
            filename: 'LastDay.xlsx', path: 'reports/LastDay.xlsx'
        }
    ])
})

module.exports = emailReportTask