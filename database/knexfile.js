// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      // host: '10xwebsolution.com',
      host: '217.21.84.1',
      database: 'u798504628_iot',
      user: 'u798504628_iot',
      password: '[K4f^vd!'
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
