// Update with your config settings.

module.exports = {
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'root', // replace with your mysql username
  //     password: 'root', // replace with your mysql password
  //     database: 'users'
  //   },
  //   debug: true
  // },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './users.db'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
