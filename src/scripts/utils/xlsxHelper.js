const XLSX = require('xlsx')

const convertJSONtoExcel = (data, type) => {
    const workSheet = XLSX.utils.json_to_sheet(data)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, type)

    XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })

    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })

    XLSX.writeFile(workBook, `reports/${type}.xlsx`)
}

module.exports = { convertJSONtoExcel }