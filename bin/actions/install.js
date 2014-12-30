
var exec = require('child_process').exec;

module.exports = function() {
  var cb = function() {
    console.log('app updated');
    process.exit(0);
  };
  exec('bower install', cb);
};