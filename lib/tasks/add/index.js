class AddTask {
  action(namespace, repoUrl) {
    console.log("add",namespace, repoUrl);
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
