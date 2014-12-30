var fs   = require('fs-extra');
var path = require('path');
var src  = path.join(process.cwd(), 'src');

module.exports = function(args) {
  var states = args[3].split(',');
  states.forEach(function(state) {
    var view = path.join(src, 'modules', args[2], 'views', args[2] + '-' + state + '.tpl.html');
    var statesFile = path.join(src, 'modules', args[2], 'config', 'states.ts');
    var content = fs.readFileSync(statesFile, {encoding: 'utf-8'});
    content += "\n\n";

    var stateBoilerplate = fs.readFileSync(path.join(__dirname, '../boilerplate/state.txt'), {encoding: 'utf-8'});
    stateBoilerplate = stateBoilerplate.replace(/MODULE/g, args[2]);
    stateBoilerplate = stateBoilerplate.replace(/STATE/g, state);
    content += stateBoilerplate;

    fs.outputFileSync(statesFile, content);
    fs.outputFileSync(view, state + ' generated state template');
    console.log(state + ' state created');
  });
  process.exit(0);
};