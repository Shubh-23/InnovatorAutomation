// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'sql3.freesqldatabase.com',
      database: 'sql3678620',
      user: 'sql3678620',
      password: 'A9413riyIn'
    },
    // connection: {
    //   database: 'employeeDB',
    
    //   user:     'root',

    //   password: 'root'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
