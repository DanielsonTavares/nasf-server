const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
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
  test: {
    client: process.env.CLIENT_DB,
    connection: 'postgres://postgres:123456@localhost/nasfdb_test',
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
