const fs = require('fs');
const path = require('path');

const args = process.argv.splice(3);
const command = process.argv[2] || '';

if (command === '') {
  // eslint-disable-next-line no-console
  console.info('Proclub Studio Commander');
  // eslint-disable-next-line no-console
  console.info();
  // eslint-disable-next-line no-console
  console.info('Usage: npm run <command>');
  // eslint-disable-next-line no-console
  console.info();
  // eslint-disable-next-line no-console
  console.info('Do not forget to add your command on package.json like:');
  // eslint-disable-next-line no-console
  console.info('"<command>": "node scripts/commander <command>"');
  // eslint-disable-next-line no-console
  console.info();
} else {
  const pwd = path.resolve('./scripts', 'commander');
  const commands = fs.readdirSync(pwd).filter(f => fs.statSync(path.join(pwd, f)).isDirectory());

  if (!commands.includes(command)) {
    // eslint-disable-next-line no-console
    console.error('Proclub Studio Commander');
    // eslint-disable-next-line no-console
    console.error();
    // eslint-disable-next-line no-console
    console.error(`There is no command "${command}".`);
    // eslint-disable-next-line no-console
    console.error();
    process.exit(1);
  } else {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(`./${command}`).run(args);
  }
}
