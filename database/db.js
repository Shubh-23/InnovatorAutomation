const knex = require('knex')
const knexfile = require('./knexfile')

const db = knex(knexfile.development)

const bookshelf = require('bookshelf')(db)

module.exports = bookshelf