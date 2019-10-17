const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const json = require('koa-json');
const Koa = require('koa');
const koaQs = require('koa-qs');
const logger = require('koa-logger');

const lib = require('./../lib');
const routes = require('./routes');

function setup(env) {
  const app = new Koa();
  koaQs(app);

  app.use(helmet());
  app.use(cors());
  app.use(bodyParser({ enableTypes: ['json', 'form'] }));
  app.use(json());

  if (env.NODE_ENV !== 'production') {
    app.use(logger());
  }

  const attachment = {
    app,
    env,

    lib: lib.attach(env),
  };

  const router = routes.attach(attachment);

  app.use(router.routes(), router.allowedMethods());

  app.onListening = async () => {};

  return app;
}

module.exports = {
  setup,
};
