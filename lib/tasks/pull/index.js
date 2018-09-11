class PullTask {
  static register(program) {
    program
      .command('pull [filter]')
      .alias('p')
      .description('Pull repositories that are defined in ~/.code.d')
      .action((filter) => new PullTask().action(filter));
  }

  action(filter) {
    const getAllUrls = require('../common/getAllUrls');
    const resolveHome = require('../common/resolveHome');

    const chalk = require('chalk');

    const os = require('os');
    const { exec } = require('child_process');

    const clone = (url) => {
      return new Promise((resolve, reject) => {
        const matches = url.match("git@(.*):(.*)");
        const domain = matches[1];
        const repo = matches[2].replace(/\.git$/, "");
        const dest = resolveHome(`~/code/${domain}/${repo}`);
        exec(`git clone ${url} ${dest}`, (error, stdout, stderr) => {
          if (error) {
            return reject(error);
          }
          resolve(stdout);
        });
      });
    };

    getAllUrls()
      .then((urls) => {
        urls = urls.filter((url) => {
          if(!filter) {
            return true;
          }

          return url.includes(filter);
        });
        Promise.all(urls.map((url) => {
          console.log(chalk.blue(`PULLING ${url}`));
          return clone(url)
            .then(() => {
              console.log(chalk.green(`SUCCESS ${url}`));
            })
            .catch((e) => {
              console.log(chalk.red(`FAILED ${url}`));
            });
        }));
      }).catch((e) => {
        console.log(chalk.red("Failed to clone"), e);
      });

  }
}

module.exports = PullTask
