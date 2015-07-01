/**
 * Deletes specified directory.
 * @tasks/clean
 */

'use strict';

var clean = require('gulp-clean');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Directory to delete.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function(){

    return gulp.src( options.src, { read: false } )
      .pipe( clean( { force: true } ) );

  }

}
