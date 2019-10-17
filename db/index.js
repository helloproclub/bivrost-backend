const postgres = require('./postgres');

function attach(attachment = {}) {
  return {
    postgres: postgres.attach(attachment),
  };
}

module.exports = {
  attach,
};
