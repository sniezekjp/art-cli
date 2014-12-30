var fs   = require('fs-extra');
var path = require('path');
var src  = path.join(process.cwd(), 'src');

module.exports = function(args) {
  var menuFile = path.join(src, 'app', 'menus', args[2] + '.ts');
  var content = fs.readFileSync(path.join(__dirname, '../boilerplate/menu.txt'), { encoding:'utf-8' });
  content = content.replace(/MENU/g, args[2]);
  fs.outputFileSync(menuFile, content);
  console.log('menu created');
  process.exit(0);
};