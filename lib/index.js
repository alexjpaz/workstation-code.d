const getAllUrls = require('./getAllUrls');
const resolveHome = require('./resolveHome');

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
    Promise.all(urls.map((url) => {
      return clone(url)
        .then(() => {
          console.log(chalk.green(`SUCESS ${url}`));
        })
        .catch((e) => {
          console.log(chalk.red(`FAILED ${url}`));
        });
    }));
  }).catch((e) => {
    console.log(chalk.red("Failed to clone"), e);
  });
