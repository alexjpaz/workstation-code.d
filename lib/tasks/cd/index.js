const inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const getAllUrls = require('../common/getAllUrls');
const fuzzy = require('fuzzy')

module.exports = (query) => {
  getAllUrls()
    .then(urls => {
      const filtered = urls.filter((url) => {
        return url.includes(query);
      })

      if(filtered.length == 1) {
        console.log(filtered[0]);
      } else if (filtered.length == 0) {
        console.error("No matches found");
        process.exit(1);
      } else {
        inquirer.prompt([
          {
            type: 'autocomplete',
            name: 'repo',
            message: 'Which repo do you want to select?',
            source: function(answersSoFar, input) {
              input = input || '';
              return new Promise((resolve, reject) => {
                const res = fuzzy.filter(input, urls).map((el) => {
                  return el.original;
                });
                resolve(res);
              });
            }
          }
        ]).then(function (answers) {
          console.log(answers.repo);
        });
      }
    });
};
