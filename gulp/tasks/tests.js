'use strict';

var config = require('../config.js');

var gulp = require('gulp');
// var cache = require('gulp-cached'); --> Deprecated by gulp.lastRun
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

gulp.task('lint', lint);
gulp.task('codestyle', codestyle);
gulp.task('mocha', tests);
gulp.task('tests', gulp.series('lint', 'codestyle', watch));

function lint(){
    return gulp.src(config.lint.src, {since: gulp.lastRun('lint')})
      //		.pipe(cache('lint')) --> deprecated by gulp.lastRun
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'))
}

function codestyle(){
  return gulp.src(config.lint.src)
    .pipe(jscs({esnext: true}));
}

function tests(){
  return gulp.src(config.tests.src).pipe(mocha(config.tests.mocha.config));
}

function watch(){
  if (config.watch) {
    gulp.watch(config.lint.src, gulp.parallel('lint', 'codestyle'));
  }
}
