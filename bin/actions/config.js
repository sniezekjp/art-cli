var fs = require('fs-extra');
var path = require('path');

module.exports = function(args) {
  var configFile = path.join(__dirname, '../config.json');
  var config = fs.readJsonSync(configFile);
  if(args[2]) {
    config[args[1]] = args[2];
    fs.outputJSONSync(configFile, config);
    console.log('config updated');
  } else {
    console.log(config[args[1]]);
  }
  process.exit(0);
};