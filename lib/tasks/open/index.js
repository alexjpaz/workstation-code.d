const inquirer = require('inquirer');
const getAllUrls = require('../common/getAllUrls');
const fuzzy = require('fuzzy')

const opener = (url) => {
  const { exec } = require('child_process');
  exec(`open ${url}`);
};

class OpenTask {
  async action(filter) {
    const urls = await getAllUrls();
    const filtered = urls.filter((v, i, a) => a.indexOf(v) === i)
      .filter((url) => {
        return url.includes(filter);
      });

    let repoUrl = null;

    if(filtered.length == 1) {
      repoUrl = filtered[0];
    } else if (filtered.length == 0) {
      console.error("No matches found");
      process.exit(1);
    } else {
      repoUrl = await OpenTask.prompt(filtered);
    }

    let url = "https://" + repoUrl
      .replace(/^git@/,'')
      .replace(/:/,'/')
      .replace(/.git$/,'');

    opener(url);
  }

  static async prompt(filtered) {
    const answers = await inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'repo',
        message: 'Which repo do you want to select?',
        source: function(answersSoFar, input) {
          input = input || '';
          return new Promise((resolve, reject) => {
            const res = fuzzy.filter(input, filtered).map((el) => {
              return el.original;
            });
            resolve(res);
          });
        }
      }
    ]);

    return answers.repo;
  }

  static register(program) {
    program
      .command('open [filter]')
      .description('Open repo in the browser')
      .action(new OpenTask().action)
  }
}

module.exports = OpenTask;
