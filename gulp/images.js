'use strict';

var gulp = require("gulp");
var pngmin = require('gulp-pngmin');
var args = require('yargs').argv;

function buildPngmin() {
  gulp.src('dist/images/**/*.png')
    .pipe(pngmin())
    .pipe(gulp.dest('dist/images'));
}

gulp.task('pngmin', ['static'], function() {
  return buildPngmin();
});

gulp.task('pngmin-watch', function() {
  return buildPngmin();
});

gulp.task("images", ["pngmin"], function() {
  if(args.watch) {
    gulp.watch('dist/images/**/*.png', ['pngmin-watch']);
  }
});
