/**
 * Setup browser sync for serving.
 * @tasks/images
 */

'use strict';

module.exports = function(gulp, bs, config) {
    return function(done) {
      bs.init({
        server: {
          baseDir: config.server.root
        },
        port: config.server.port,
        ghostMode: {
          clicks: false,
          forms: false,
          scroll: false
        }
      });
      done();
    };
};
