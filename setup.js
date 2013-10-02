
var util  = require('util'),
    spawn = require('child_process').spawn,
    ls    = spawn('ls', ['-lh', '/usr']);
    brClient = spawn('browserify', ['./performer/index.js', '-o', './static/js/performerBundle.js']);
    prProj = spawn('browserify', ['./projector/index.js', '-o', './static/js/projectorBundle.js']);
    startup = spawn('supervisor', ['index.js']);