'use strict';

var config = require('../config');
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts-vendor', function(){
  return gulp.src(config.scripts.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.scripts.dist));
});
