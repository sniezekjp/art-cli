#!/usr/bin/env node

var args  = process.argv.splice(2);

try {
  require('./actions/' + args[0])(args);
} catch (e) {
  console.log('Could not find command');
  process.exit(0);
}
