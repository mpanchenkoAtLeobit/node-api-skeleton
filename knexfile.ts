import { Config } from './config';
import { Knex } from 'knex'

const dbConfig = (new Config()).db;

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    ...dbConfig.connection
  },
  pool: { ...dbConfig.pool },
  migrations: { tableName: 'knex_migrations' },
  //seeds: {tableName: 'knex_seeds'}
};

module.exports = knexConfig;
