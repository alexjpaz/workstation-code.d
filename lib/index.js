const pkg = require('../package.json');
const program = require('commander');

const cdTask = require('./tasks/cd');

program
  .version(pkg.version)
  .description(pkg.description);

const tasks = [
  'add',
  'ls',
  'pull'
];

tasks.map((task) => {
  let mod = require(`./tasks/${task}`);
  mod.register(program);
});

program
  .command('search [query]')
  .description('Search and change to a repository ')
  .action(query => cdTask(query));

program
  .command('cd [query]', { isDefault: true })
  .description('Search and change to a repository ')
  .action(query => cdTask(query));

program.parse(process.argv);

