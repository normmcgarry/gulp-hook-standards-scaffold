/**
 * Merges all ( vendor ) javascript files into one js file.
 * @tasks/scripts-vendor
 */

'use strict';

var concat = require('gulp-concat');
var concatsource = require('gulp-concat-sourcemap');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

/**
 * @param gulp - function
 * @param options - object
 * options.vendor : Path to the entry js file.
 * options.dist : Destination directory for file output.
 * @param flags - object
 * flags.minify : boolean
 * flags.sourcemap : boolean
 * @returns {Function}
 */
module.exports = function( gulp, options, flags ) {

  return function(){

    return gulp.src(options.vendor.src)
      .pipe(flags.minify ? streamify(uglify()) : gutil.noop())
      .pipe(flags.sourcemap ? concatsource(options.vendor.output, {sourcesContent: true}) : concat(options.vendor.output))
      .pipe(gulp.dest(options.dist));

  };

};
