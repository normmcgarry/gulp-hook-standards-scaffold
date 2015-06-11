'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var concatsource = require('gulp-concat-sourcemap');

gulp.task('scripts-vendor', function(){
  return gulp.src(config.scripts.vendor)
    .on('error', function (error) {
      gutil.log('scripts-vendor error: ' + error);
    })
    .pipe(concatsource('vendor.js', {sourcesContent: true}))
    .pipe(gulp.dest(config.scripts.dist));
});
