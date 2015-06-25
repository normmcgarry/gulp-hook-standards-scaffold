/**
 * Merges all stylus and css files into one css file.
 * @tasks/styles
 */

'use strict';

var stylus = require( 'gulp-stylus' );
var nib = require( 'nib' );
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

/**
 * @param gulp - function
 * @param options - object
 * options.entry : Path to the entry stylus or css file.
 * options.dist : Destination directory for file output
 * @param flags - object
 * flags.minify : boolean
 * flags.sourcemap : boolean
 * @returns {Function}
 */
module.exports = function( gulp, options, flags ) {

  return function(){

    return gulp.src( options.entry )
      .pipe(sourcemaps.init())
      .pipe( stylus({
        'use': [ nib() ],
        'include css': true,
        sourcemap: {
          inline: flags.sourcemap
        }
      }))
      .pipe( flags.minify ? minifyCss() : gutil.noop())
      .pipe( flags.sourcemap ? sourcemaps.write() : gutil.noop())
      .pipe( gulp.dest( options.dist ));

  }

}
