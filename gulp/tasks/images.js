'use strict';

var config = require('../config');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
  return gulp.src(config.images.src /*, {since: gulp.lastRun('images')}*/ )
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.dist));
});
