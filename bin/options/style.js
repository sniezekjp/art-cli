var fs   = require('fs-extra');
var path = require('path');
var src  = path.join(process.cwd(), 'src');

module.exports = function(args) {
  var file = args[3] + '.scss' || 'style.scss';
  var styleFile = path.join(src,'modules', args[2], 'scss', file);
  fs.ensureFileSync(styleFile);

  var mainStyle = path.join(src, 'assets', 'css', 'style.scss');
  var content = fs.readFileSync(mainStyle, {encoding: 'utf-8'});
  var replaceHook = '//styles';
  var includeFile = "@import '../../modules/" + args[2] + '/scss/' + file + "';\n" + replaceHook;
  content = content.replace(replaceHook, includeFile);
  fs.outputFileSync(mainStyle, content);

  console.log('stylesheet created');
  process.exit(0);
};