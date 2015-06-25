/**
 * Merges all ( non LIB ) javascript files into one js file using browserify.
 * @tasks/scripts-app
 */

'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

/**
 * @param gulp - function
 * @param options - object
 * options.entry : Path to the entry js file.
 * options.dist : Destination directory for file output
 * @param flags - object
 * flags.minify : boolean
 * flags.sourcemap : boolean
 * @returns {Function}
 */
module.exports = function( gulp, options, flags ) {

  return function(){

    var bundler = browserify(options.entry, {
      debug: flags.sourcemap,
      cache: {}
    });

    var rebundle = function() {
      return bundler.bundle()
        .pipe(source(options.output))
        .pipe(gulpif(flags.sourcemap, buffer()))
        .pipe(gulpif(flags.sourcemap, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(flags.minify, streamify(uglify())))
        .pipe(gulpif(flags.sourcemap, sourcemaps.write('./')))
        .pipe(gulp.dest(options.dist));
    };

    bundler.on('update', rebundle);

    return rebundle();

  }

}
