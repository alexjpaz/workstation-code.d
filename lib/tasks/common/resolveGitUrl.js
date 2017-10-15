const resolveHome = require('./resolveHome');

module.exports = (url) => {
    const matches = url.match("git@(.*):(.*)");
    const domain = matches[1];
    const repo = matches[2].replace(/\.git$/, "");
    const dest = resolveHome(`~/code/${domain}/${repo}`);
    return dest;
};
