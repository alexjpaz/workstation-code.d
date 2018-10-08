class PullTask {
  static register(program) {
    program
      .command('pull [filter]')
      .alias('p')
      .description('Pull repositories that are defined in ~/.code.d')
      .action((filter) => new PullTask().action(filter));
  }

  async action(filter) {
    const getAllUrls = require('../common/getAllUrls');
    const resolveHome = require('../common/resolveHome');
    const resolveGitUrl = require('../common/resolveGitUrl');

    const execAsync= require('../common/execAsync');

    const chalk = require('chalk');

    const os = require('os');

    const clone = async (url) => {
      const dest = resolveGitUrl(url);
      return await execAsync(`git clone ${url} ${dest}`);
    };

    const checkRepoExists = async (url) => {
      const dest = resolveGitUrl(url);
      try {
        const l = await execAsync(`ls ${dest}`);
        return true;
      } catch(e) {
        return false;
      }
    };

    let urls = await getAllUrls();

    urls = urls.filter((url) => {
      if(!filter) {
        return true;
      }

      return url.includes(filter);
    });

    const promises = urls.map(async (url) => {
      const repoExists = await checkRepoExists(url);
      if(repoExists) {
        console.log(chalk.gray(`SKIPPING ${url}`));
        return;
      } else {
        console.log(chalk.bold.blue(`PULLING ${url}`));
      }

      try {
        await clone(url);
        console.log(chalk.bold.green(`SUCCESS ${url}`));
      } catch(e) {
        console.log(chalk.bold.red(`FAILED ${url}`));
      }
    });

    try {
      await Promise.all(promises);
    } catch(e) {
      console.log(chalk.red("Failed to clone"), e);
    }
  }
}

module.exports = PullTask
