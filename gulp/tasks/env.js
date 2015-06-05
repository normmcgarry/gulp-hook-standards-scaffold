'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var src = config.production ? config.env.prod : config.env.dev;

function env(){
  return gulp.src(src)
    .pipe(rename(config.env.name))
    .pipe(gulp.dest(config.env.dist))
    .pipe(browser.reload({stream: true}));
}

function log(){
  gutil.log(gutil.colors.yellow('Reloading env...'));
}

function watch(){
  if (config.watch) {
    gulp.watch(src, gulp.series(log, env));
  }
}
// main task

gulp.task('env', gulp.parallel(env, watch));
