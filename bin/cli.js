#!/usr/bin/env node

var args = process.argv.splice(2);
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

switch(args[0]) {
  case "new": 
    var appName = args[1] || 'app';
    var cb = function() {
      console.log('app created');
      process.exit(0);
    }
    exec('git clone git@github.com:sniezekjp/art-seed.git ' + appName, cb);
    break;
  case "install":
    var cb = function() {
      console.log('app updated');
      process.exit(0);
    }
    exec('bower install', cb);
    break;
  case "serve":
    try {
      var port = args[1] || 3000;
      var serve = spawn('serve', ['src', '--port', port]);
      serve.stdout.setEncoding('utf-8');
      serve.stderr.setEncoding('utf-8');
      serve.stdout.on('data', function(data) {
        console.log(data.replace(/\n/g, ""));
      });
      serve.stderr.on('data', function(data) {
        console.log(data.replace(/\n/g, ""));
      });
    } catch(e) {
      console.log('Please run npm install -g serve');
      process.exit(0);
    }
    break;
}
