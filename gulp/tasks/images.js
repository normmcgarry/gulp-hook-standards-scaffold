'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
// var changed = require('gulp-changed'); -- deprecated by gulp.lastRun
var imagemin = require('gulp-imagemin');

function images(){

	return gulp.src(config.images.src, {since: gulp.lastRun(images)})
    //		.pipe(changed(config.images.dist)) --> deprecated by gulp.lastRun
		.pipe(imagemin())
		.pipe(gulp.dest(config.images.dist))
    .pipe(browser.reload({stream: true}));

}


// watch tasks
function log(){
  gutil.log(gutil.colors.yellow('Reloading images...'));
}


function watch(){
  if (config.watch) {
    gulp.watch(config.images.src, gulp.series(log, images));
  }
}

// main task

gulp.task('images', gulp.parallel(images, watch));
