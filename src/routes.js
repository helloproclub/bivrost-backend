const httpStatus = require('http-status-codes');
const router = require('koa-router')();

// eslint-disable-next-line no-unused-vars
function attach(attachment = {}) {
  router.get('/ping', async ctx => {
    ctx.status = httpStatus.OK;
    ctx.body = {
      code: httpStatus.OK,
      message: 'pong',
      ok: true,
    };
  });

  router.all('*', async ctx => {
    ctx.status = httpStatus.NOT_FOUND;
    ctx.body = {
      code: httpStatus.NOT_FOUND,
      message: 'not found',
      ok: false,
    };
  });

  return router;
}

module.exports = {
  attach,
};
