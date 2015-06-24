'use strict';

var config = require('../config');
var gulp = require('gulp');
var concatsource = require('gulp-concat-sourcemap');

gulp.task('scripts-vendor', function(){
  return gulp.src(config.scripts.vendor)
    .pipe(concatsource('vendor.js', {sourcesContent: true}))
    .pipe(gulp.dest(config.scripts.dist));
});
