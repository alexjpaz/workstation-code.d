const chalk = require('chalk');
const resolveGitUrl = require('../common/resolveGitUrl');
const execAsync= require('../common/execAsync');
const getAllUrls = require('../common/getAllUrls');

class StatusTask {
  async checkStatus(url) {
    const dest = await resolveGitUrl(url);

    try {
      await execAsync(`cd ${dest} && git diff-index --quiet HEAD --`);
      return true;
    } catch(e) {
      return false;
    }
  }

  async action() {
    let urls = await getAllUrls();

    let promises = urls.map(async (url) => {
      let status = await this.checkStatus(url);

      const result = {
        url,
        status
      };

      return result;
    });

    let statuses = await Promise.all(promises);

    statuses.forEach((status) => {
      if(status.status) {
        console.log(chalk.red(`${status.url} is dirty`));
      }
    });
  }
}

StatusTask.register = (program) => {
  program
    .command('status [pattern]')
    .description('Get repo statuses')
    .action(() => {
      new StatusTask().action();
    })
};

module.exports = StatusTask;
