const pkg = require('../package.json');
const program = require('commander');

const cdTask = require('./tasks/cd');

program
  .version(pkg.version)
  .description(pkg.description);

const tasks = [
  require('./tasks/add'),
  require('./tasks/ls'),
  require('./tasks/pull'),
  require('./tasks/status'),
  require('./tasks/open'),
];

tasks.map((task) => {
  task.register(program);
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

