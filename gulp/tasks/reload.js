/**
 * Reloads the browser when using LiveReload
 * @tasks/reload
 */

'use strict';

var connect = require('gulp-connect');

/**
 * @param gulp - function
 * @param options - object
 * options.root : Path to the LiveReload's root
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function(){

    return gulp.src(options.root)
      .pipe(connect.reload());

  }

}
