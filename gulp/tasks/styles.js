/**
 * Merges all stylus and css files into one css file.
 * @tasks/styles
 */

'use strict';

var stylus = require( 'gulp-stylus' );
var nib = require( 'nib' );
var csso = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');

/**
 * @param gulp - function
 * @param options - object
 * options.entry : Path to the entry stylus or css file.
 * options.dist : Destination directory for file output.
 * @param flags - object
 * flags.minify : boolean
 * flags.sourcemap : boolean
 * @returns {Function}
 *
 * Note: if you pass flags.minify and flags.sourcemap both as true
 * then line numbers from the orginal files are injected but no minification happens.
 */
module.exports = function( gulp, options, flags ) {

  return function(){

    // local
    if( flags.sourcemap === true && flags.minify === false ){
      return gulp.src( options.entry )
        .pipe(stylus({
          'use': [nib()],
          'include css': true,
          sourcemap: {
            inline: true
          }
        }))
        .pipe(gulp.dest(options.dist));
    }

    // dev - concat CSS with sourcemap but do not minify
    // as doing so breaks the sourcemaps
    // a work around is to include line numbers back to the styl files
    if( flags.sourcemap === true && flags.minify === true ){
      return gulp.src( options.entry )
        .pipe(stylus({
          'use': [nib()],
          'include css': true,
          linenos: true
        }))
        .pipe(gulp.dest(options.dist));
    }

    // prod minify with no sourcemap
    return gulp.src( options.entry )
      .pipe(stylus({
        'use': [nib()],
        'include css': true,
      }))
      .pipe(csso())
      .pipe(gulp.dest(options.dist));
  }

}

