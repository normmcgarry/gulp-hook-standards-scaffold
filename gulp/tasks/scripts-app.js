'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts-app', function(){

  var bundler = browserify(config.scripts.entry, {
    debug: !config.production,
    cache: {}
  });

  var rebundle = function() {
    return bundler.bundle()
      .on('error', function (error) {
        gutil.log('scripts-app error: ' + error);
      })
      .pipe(source(config.scripts.output))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.scripts.dist));
  };

  bundler.on('update', rebundle);

  return rebundle();
});
