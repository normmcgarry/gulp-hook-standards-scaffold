'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
//var changed = require('gulp-changed'); --> deprecated by gulp.lastRun()
gulp.task('static', gulp.series(statics, watch));
function statics() {

  return gulp.src(config.static.src, {since: gulp.lastRun('static')})
    //    .pipe(changed(config.static.dist)) --> deprecated by gulp.lastRun()
    .pipe(gulp.dest(config.static.dist))
    .pipe(browser.reload({stream: true}));

}

function watch(){
  //if (config.watch) {
    gulp.watch(config.static.src, gulp.series(log, statics));
  //}
}

function log(){
  return gutil.log(gutil.colors.yellow('Reloading static...'));
}
