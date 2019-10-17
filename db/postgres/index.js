const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const config = require('./config');

function isValidFile(file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}

function attach(attachment = {}) {
  const { env, lib } = attachment;

  const { logger } = lib;
  const { NODE_ENV, POSTGRES_DATABASE } = env;

  if (!NODE_ENV) {
    // eslint-disable-next-line no-console
    console.error('NODE_ENV is not defined');
    process.exit(1);
  }

  const db = config[NODE_ENV];
  const sequelize = new Sequelize(db.database, db.username, db.password, db);

  sequelize
    .authenticate()
    .then(() => {
      if (NODE_ENV !== 'production') {
        logger.default.info(`Connected to "${POSTGRES_DATABASE}" database.`);
      }
    })
    .catch(exception => {
      logger.default.error(exception.original.message);

      // eslint-disable-next-line no-console
      console.error(`Unable to connect to the "${POSTGRES_DATABASE}" database.`);
      // eslint-disable-next-line no-console
      console.error();
      // eslint-disable-next-line no-console
      console.error(`Please see more on log/app.${NODE_ENV}.log.`);
      process.exit(1);
    });

  const pwd = path.resolve('./db/postgres');
  const models = `${pwd}/models`;

  fs.readdirSync(models)
    .filter(file => isValidFile(file))
    .forEach(file => sequelize.import(path.join(models, `/${file}`)));

  return sequelize;
}

module.exports = {
  attach,
};
