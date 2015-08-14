module.exports = function() {
  return function(done) {
    var electron = require('electron-prebuilt');
    var proc = require('child_process');

    var child = proc.spawn(electron, ['./dist']);

    done();
  };
};
