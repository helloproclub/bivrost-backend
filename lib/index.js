const logger = require('./logger');

function attach(env) {
  const libs = [logger];
  const ret = {};

  libs.forEach(lib => {
    ret[lib.name] = lib().attach(env);
  });

  return ret;
}

module.exports = {
  attach,
};
