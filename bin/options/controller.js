var fs   = require('fs-extra');
var path = require('path');
var configFile = path.join(__dirname, '../config.json');
var config = fs.readJsonSync(configFile);
var src  = path.join(process.cwd(), config.src);


module.exports = function(args) {
  var ctrlFile = path.join(src, 'modules', args[2], 'controllers', args[3] + 'Controller.ts');

  var ctrlContent = fs.readFileSync(path.join(__dirname,'../boilerplate/controller.txt'), {encoding:'utf-8'});
  ctrlContent = ctrlContent.replace(/CTRL/g, args[3]);

  var appType = (args[4] === '--lazy') ? 'lazy' : 'app';
  ctrlContent = ctrlContent.replace(/APP_TYPE/g, appType);

  fs.outputFileSync(ctrlFile, ctrlContent);
  console.log('controller created');
  process.exit(0);
};