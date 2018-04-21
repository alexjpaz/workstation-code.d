const getAllUrls = require('../common/getAllUrls');

class ListTask {
  async action(namespace) {
    const urls = await getAllUrls();
    console.log(urls.join('\n'));
  }

  static register(program) {
    program
      .command('ls [namespace]')
      .description('List repos')
      .action(new ListTask().action)
  };
}

module.exports = ListTask; 
