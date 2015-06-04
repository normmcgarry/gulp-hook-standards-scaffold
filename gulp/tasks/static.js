'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');

gulp.task('do-static', gulp.parallel(function() {

  return gulp.src(config.static.src)
    .pipe(changed(config.static.dist))
    .pipe(gulp.dest(config.static.dist))
    .pipe(browser.reload({stream: true}));

}));


// watch tasks

gulp.task('reload-static', gulp.parallel('do-static', function () {

  gutil.log(gutil.colors.yellow('Reloading static...'));

}));


// main task

gulp.task('static', gulp.parallel('do-static', function() {

  if (config.watch) {
    gulp.watch(config.static.src, gulp.series('reload-static'));
  }

}));
