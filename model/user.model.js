const bookshelf = require('../database/db')
const sales = require('./sales.model')

const employeeDetails = bookshelf.model('employee_details',{
    tableName:'employee_details',
    idAttribute:'id',
    sales() {
        return this.hasMany(sales, "employee_id")
    }
})

module.exports = employeeDetails