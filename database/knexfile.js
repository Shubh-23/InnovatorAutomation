// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    // connection: {
    //   host: 'sql11.freesqldatabase.com',
    //   database: 'sql11676677',
    //   user: 'sql11676677',
    //   password: 'lmKPF8lELX'
    // },
    connection: {
      database: 'employeeDB',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
