const resolveHome = require('./resolveHome');

module.exports = (url) => {
    const matches = url.match("(git@)?(.*):(.*)");
    const domain = matches[2];
    const repo = matches[3]
      .replace(/\.git$/, "")
      .replace(/~/, "")
    ;
    const dest = resolveHome(`~/code/${domain}/${repo}`);
    return dest;
};
