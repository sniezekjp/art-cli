var fs = require('fs-extra');
var path = require('path');

module.exports = function(args) {
  try {
    var configFile = path.join(process.cwd(), './.artrc');
    var config = fs.readJsonSync(configFile);

    var src = path.join(process.cwd(), config.src);

    var modules = args[2].split(',');
    modules.forEach(function(module) {
      var upperCaseModule = module;
      module = module.toLowerCase();
      var dir = path.join(src, 'modules', module);
      var configDir = path.join(dir, 'config');
      var views = path.join(dir, 'views');
      var menus = path.join(configDir, 'menus.ts');
      var states = path.join(configDir, 'states.ts');

      fs.ensureDirSync(dir);
      fs.ensureDirSync(configDir);
      fs.ensureDirSync(views);

      var menusBoilerplate = fs.readFileSync(path.join(__dirname, '../boilerplate/menus.txt'), {encoding: 'utf-8'});
      var statesBoilerplate = fs.readFileSync(path.join(__dirname, '../boilerplate/states.txt'), {encoding: 'utf-8'});

      var menusContent = menusBoilerplate.replace(/UPPERCASE_MODULE/g, upperCaseModule);
      menusContent = menusContent.replace(/MODULE/g, module);
      var statesContent = statesBoilerplate.replace(/MODULE/g, module);

      fs.outputFileSync(path.join(configDir, 'menus.ts'), menusContent);
      fs.outputFileSync(path.join(configDir, 'states.ts'), statesContent);
      fs.outputFileSync(path.join(views, module + '.tpl.html'), '<h1>' + upperCaseModule + ' module</h1>');

      var bootstrapPath = path.join(src, 'app', 'bootstrap.ts');
      var bootstrap = fs.readFileSync(bootstrapPath, {encoding: 'utf-8'});
      var depString = '/// dependencies';
      var menuPath = '../modules/' + module + '/config/menus';
      var statePath = '../modules/' + module + '/config/states';
      var menu = '/// <amd-dependency path="' + menuPath + '" />\n';
      var state = '/// <amd-dependency path="' + statePath + '" />\n\n';
      var updatedDeps = menu + state + depString;
      bootstrap = bootstrap.replace(depString, updatedDeps);
      fs.outputFileSync(bootstrapPath, bootstrap);

      console.log(module + ' module created');
    });

    process.exit(0);
  } catch(e) {
    console.log(e);
    process.exit();
  }
};