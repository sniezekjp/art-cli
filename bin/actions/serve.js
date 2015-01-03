
var express = require('express');
var serve = require('serve-static');
var path = require('path');
var fs = require('fs-extra');

module.exports = function(args) {
  var app = express();
  var configFile = path.join(process.cwd(), './.artrc');
  var config = fs.readJsonSync(configFile);
  var serving  = path.join(process.cwd(), config.src);
  app.use(serve(path.join(serving)));
  app.all('*', function(req, res, next) {
    if(req.path === '/favicon.ico') {
      return next();
    }
    console.log('\033[0m404 \033[36m%s\033[0m Assuming SPA, Loading \033[36m%s\033[0m', req.path, 'index.html');
    next();
  });
  app.get("*", function(req, res) {
    res.sendFile('index.html', { root: config.src });
  });
  var port = args[1] || 3000;
  app.listen(port);
  console.log('\033[0mserving \033[36m%s\033[0m on port \033[96m%d\033[0m', serving, port);
};