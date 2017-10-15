const pkg = require('../package.json');
const program = require('commander');

const pullTask = require('./tasks/pull');
const cdTask = require('./tasks/cd');

program
  .version(pkg.version)
  .description(pkg.description);

program
  .command('pull')
  .alias('p')
  .description('Pull repositories that are defined in ~/.code.d')
  .action(name => pullTask());

program
  .command('search [query]')
  .description('Search and change to a repository ')
  .action(query => cdTask(query));

program
  .command('cd [query]', { isDefault: true })
  .description('Search and change to a repository ')
  .action(query => cdTask(query));

program.parse(process.argv);

