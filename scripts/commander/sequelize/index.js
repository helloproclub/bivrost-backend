const fs = require('fs');
const path = require('path');

function run(args) {
  const pwd = path.resolve('./scripts/commander', 'sequelize');
  const databases = fs
    .readdirSync(pwd)
    .filter(f => fs.statSync(path.join(pwd, f)).isFile())
    .filter(f => f !== 'index.js')
    .map(f => f.substr(0, f.length - 3));

  const database = args[0] || '';

  if (database === '') {
    // eslint-disable-next-line no-console
    console.info('Proclub Studio Commander for Sequelize');
    // eslint-disable-next-line no-console
    console.info();
    // eslint-disable-next-line no-console
    console.info('Usage: npm run sequelize <database>');
    // eslint-disable-next-line no-console
    console.info();
    // eslint-disable-next-line no-console
    console.info('Supported database:');
    databases.forEach(db => {
      // eslint-disable-next-line no-console
      console.info('  -', db);
      // eslint-disable-next-line no-console
      console.info('      Try to run `npm run sequelize postgres`!');
    });
    // eslint-disable-next-line no-console
    console.info();
    // eslint-disable-next-line no-console
    console.info('If you want to pass any options, emit `--` like below:');
    // eslint-disable-next-line no-console
    console.info();
    // eslint-disable-next-line no-console
    console.info('  npm run sequelize postgres model:generate -- \\');
    // eslint-disable-next-line no-console
    console.info('    --name ModelName --attributes <..>');
    // eslint-disable-next-line no-console
    console.info();
  } else if (!databases.includes(database)) {
    // eslint-disable-next-line no-console
    console.error('Proclub Studio Commander for Sequelize');
    // eslint-disable-next-line no-console
    console.error();
    // eslint-disable-next-line no-console
    console.error(`There is no database "${database}".`);
    // eslint-disable-next-line no-console
    console.error();
    process.exit(1);
  } else {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(`./${database}`).exec(args.splice(1));
  }
}

module.exports = {
  run,
};
