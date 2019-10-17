const path = require('path');
const winston = require('winston');
const { Timber } = require('@timberio/node');

function initTimber(env) {
  const { TIMBER_API_KEY, TIMBER_SOURCE_ID } = env;

  const client = new Timber(TIMBER_API_KEY, TIMBER_SOURCE_ID, { ignoreExceptions: true });

  return client;
}

function initWinston(env) {
  const { NODE_ENV } = env;
  const pwd = path.resolve('./log');

  const client = winston.createLogger({
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.File({ filename: `${pwd}/app.${NODE_ENV}.log` })],
  });

  return client;
}

function logger() {
  const attach = env => {
    const { NODE_ENV } = env;

    const offlineLog = initWinston(env);
    const onlineLog = initTimber(env);

    return {
      default: NODE_ENV === 'production' ? onlineLog : offlineLog,

      timber: onlineLog,
      winston: offlineLog,
    };
  };

  return {
    attach,
  };
}

module.exports = logger;
