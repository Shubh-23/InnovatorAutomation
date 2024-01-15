const bookshelf = require('../database/db')

const employeeReport = bookshelf.model('employee_report',{
    tableName:'employee_report',
    idAttribute:'id'
})

module.exports = employeeReport