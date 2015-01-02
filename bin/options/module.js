var fs = require('fs-extra');
var path = require('path');
module.exports = function(args) {
  var configFile = path.join(__dirname, '../config.json');
  var config = fs.readJsonSync(configFile);

  var src = path.join(process.cwd(), config.src);
  var dir = path.join(src, 'modules', args[2]);
  var config = path.join(dir, 'config');
  var views  = path.join(dir, 'views');
  var menus  = path.join(config, 'menus.ts');
  var states = path.join(config, 'states.ts');

  fs.ensureDirSync(dir);
  fs.ensureDirSync(config);
  fs.ensureDirSync(views);

  var menusBoilerplate = fs.readFileSync(path.join(__dirname, '../boilerplate/menus.txt'), {encoding: 'utf-8'});
  var statesBoilerplate = fs.readFileSync(path.join(__dirname, '../boilerplate/states.txt'), {encoding: 'utf-8'});

  var menusContent = menusBoilerplate.replace(/MODULE/g, args[2]);
  var statesContent = statesBoilerplate.replace(/MODULE/g, args[2]);

  fs.outputFileSync(path.join(config, 'menus.ts'), menusContent);
  fs.outputFileSync(path.join(config, 'states.ts'), statesContent);
  fs.outputFileSync(path.join(views, args[2] + '.tpl.html'), '<h1>'+args[2]+' module</h1>');

  var bootstrapPath = path.join(src, 'app', 'bootstrap.ts');
  var bootstrap = fs.readFileSync(bootstrapPath, {encoding: 'utf-8'});
  var depString = '/// dependencies';
  var menuPath = '../modules/' + args[2] + '/config/menus';
  var statePath = '../modules/' + args[2] + '/config/states';
  var menu = '/// <amd-dependency path="'+menuPath+'" />\n';
  var state = '/// <amd-dependency path="'+statePath+'" />\n\n';
  var updatedDeps = menu + state + depString;
  bootstrap = bootstrap.replace(depString, updatedDeps);
  fs.outputFileSync(bootstrapPath, bootstrap);

  console.log('module created');
  process.exit(0);
};