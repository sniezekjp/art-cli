
var exec = require('child_process').exec;

module.exports = function(args) {
  var option = args[1];
  try {
    require('../options/' + option)(args);
  } catch(e) {
    var appName = args[1] || 'app';
    var createCb = function() {
      console.log('app created');
      process.exit(0);
    };
    exec('git clone git@github.com:sniezekjp/ng-require-typescript-seed.git ' + appName, createCb);
  }
};