const bookshelf = require('../database/db')

const admin = bookshelf.model('admin',{
    tableName:'admin',
    idAttribute:'id',

})

module.exports = admin