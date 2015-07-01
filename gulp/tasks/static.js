/**
 * Copies a specified directory to another location.
 * @tasks/static
 */

'use strict';

var clean = require('gulp-clean');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Directory to copy.
 * options.dist : Destination to copy options.src to.
 * @returns {Function}
 */
module.exports = function( gulp, options, flags ) {

  return function(){

    return gulp.src(options.src)
      .pipe(gulp.dest(options.dist));

  }

}
