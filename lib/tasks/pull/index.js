module.exports = () => {

const getAllUrls = require('../common/getAllUrls');
const resolveHome = require('../common/resolveHome');

const chalk = require('chalk');

const os = require('os');
const { exec } = require('child_process');

const resolveUrl = (url) => {
  const matches = url.match("git@(.*):(.*)");
  const domain = matches[1];
  const repo = matches[2].replace(/\.git$/, "");
  const dest = resolveHome(`~/code/${domain}/${repo}`);

  return {
    matches,
    domain,
    repo,
    dest
  }
};

const checkIfExists = (url) => {
  return new Promise((resolve, reject) => {
    const { dest } = resolveUrl(url);
    exec(`GIT_DIR=${dest}/.git git status`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });

  });
};

const clone = (url) => {
  return new Promise((resolve, reject) => {
    const { 
      matches,
      domain,
      repo,
      dest
    } = resolveUrl(url);
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
          console.log(chalk.green(`Successfully cloned ${url}`));
        })
        .catch((e) => {
          console.log(chalk.red(`FAILED ${url}`));
        });
    }));
  }).catch((e) => {
    console.log(chalk.red("Failed to clone"), e);
  });

};
