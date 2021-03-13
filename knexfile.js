const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    client: 'sqlite3',
    connection: {filename: `${__dirname}/devdb.db`},
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/${process.env.PATH_DIST}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/${process.env.PATH_DIST}/database/seeds`,

    },
  },
  test: {
    client: 'sqlite3',
    connection: {filename: `${__dirname}/testdb.db`},
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/${process.env.PATH_DIST}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/${process.env.PATH_DIST}/database/seeds`,

    },
  },
  production: {
    client: process.env.CLIENT_DB,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/${process.env.PATH_DIST}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/${process.env.PATH_DIST}/database/seeds`,

    },
  },
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};

module.exports = config;
