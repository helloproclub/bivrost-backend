const { execSync } = require('child_process');
const path = require('path');

function exec(args) {
  const pwd = path.resolve('./db/postgres');

  if (args.length === 0) {
    execSync(`sequelize`, { stdio: [0, 1, 2] });
  } else {
    execSync(`sequelize --options-path ${pwd}/.sequelizerc ${args.join(' ')}`, {
      stdio: [0, 1, 2],
    });
  }
}

module.exports = {
  exec,
};
