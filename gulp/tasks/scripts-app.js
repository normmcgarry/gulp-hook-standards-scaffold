'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('scripts-app', function(a){

  var bundler = browserify(config.scripts.entry, {
    debug: true,
    cache: {}
  });

  var rebundle = function() {
    return bundler.bundle()
      .pipe(source(config.scripts.output))
      .pipe(buffer())
      .pipe(gulp.dest(config.scripts.dist));
  };

  bundler.on('update', rebundle);

  return rebundle();
});
