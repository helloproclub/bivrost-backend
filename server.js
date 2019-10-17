const http = require('http');

const app = require('./src/app');

require('dotenv').config();

const { env } = process;

function normalizePort(val) {
  // eslint-disable-next-line radix
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 8081);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const application = app.setup(env);
const server = http.createServer(application.callback());

async function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  await application.onListening();

  if (env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Listening on ${bind}`);
    // eslint-disable-next-line no-console
    console.log('Using environment: ', env.NODE_ENV);
  }
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
