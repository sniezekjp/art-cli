var fs   = require('fs-extra');
var path = require('path');
var configFile = path.join(__dirname, '../config.json');
var config = fs.readJsonSync(configFile);
var src  = path.join(process.cwd(), config.src);

module.exports = function(args) {
  var menuFile;
  if(args[2] === 'app') {
    menuFile = path.join(src, 'app', 'menus', args[3] + '.ts');
  } else {
    menuFile = path.join(src, 'modules', args[2], 'menus', args[3] + '.ts');
  }
  var menuType = args[2] === 'app' ? 'app-' : 'module-';

  var content = fs.readFileSync(path.join(__dirname, '../boilerplate/'+menuType+'menu.txt'), { encoding:'utf-8' });
  content = content.replace(/MENU/g, args[3]);
  fs.outputFileSync(menuFile, content);
  console.log('menu created');
  process.exit(0);
};