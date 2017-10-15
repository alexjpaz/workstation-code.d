const resolveHome = require('./resolveHome');

module.exports = () => {

  var fs = require('fs');

  var path = require('path');
  var files = fs.readdirSync(resolveHome("~/.code.d"));

  const repoURls = files.map((file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(resolveHome("~/.code.d/"+file), (err, data) => {
        if(err) return reject(err);
        return resolve(data.toString().trim().split('\n'));
      });
    });
  });

  return Promise.all(repoURls)
    .then((urls) => {

      return urls.reduce((p,c) => {
        p = p.concat(c);
        return p;
      }, []);
    }).catch((e) => {
      console.error(e);
      throw e;
    });
};
