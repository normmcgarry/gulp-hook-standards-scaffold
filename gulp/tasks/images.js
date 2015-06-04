'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

gulp.task('do-images', [], function () {

	return gulp.src(config.images.src)
		.pipe(changed(config.images.dist))
		.pipe(imagemin())
		.pipe(gulp.dest(config.images.dist))
    .pipe(browser.reload({stream: true}));

});


// watch tasks

gulp.task('reload-images', ['do-images'], function () {

  gutil.log(gutil.colors.yellow('Reloading images...'));

});


// main task

gulp.task('images', ['do-images'], function() {

  if (config.watch) {
    gulp.watch(config.images.src, ['reload-images']);
  }

});
