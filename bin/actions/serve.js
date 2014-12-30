
var express = require('express');
var serve = require('serve-static');
var path = require('path');

module.exports = function(args) {
  var app = express();
  app.use(serve(path.join(process.cwd(), 'src')));
  app.get("*", function(req, res) {
    res.sendFile('index.html', { root: 'src' });
  });
  var port = args[1] || 3000;
  app.listen(port);
  console.log(port);
};