const fs = require('fs');
const resolveHome = require('../common/resolveHome');

class AddTask {
  action(namespace, repoUrl) {
    if(!namespace) {
      throw new Error("Must specify a namespace");
    }

    if(!repoUrl) {
      throw new Error("Must specify a repoUrl");
    }

    fs.appendFileSync(resolveHome(`~/.code.d/${namespace}`), repoUrl)

    console.log(`Added ${repoUrl} to ${namespace}`); 
  }
}

AddTask.build = () => {
  return new AddTask();
}

AddTask.register = (program) => {
  program
    .command('add [namespace] [repoUrl]')
    .description('Add repo')
    .action(new AddTask().action)
};

module.exports = AddTask; 
