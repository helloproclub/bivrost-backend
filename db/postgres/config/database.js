const path = require('path');

require('dotenv').config({
  path: path.resolve('./', '.env'),
});

const lib = require('./../../../lib');

const { env } = process;
const logger = lib.logger({ env });

const defaultConfig = {
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,

  database: env.POSTGRES_DATABASE,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,

  dialect: 'postgres',
  logging: msg => logger.winston.info(msg),
};

module.exports = {
  development: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
  },
};
