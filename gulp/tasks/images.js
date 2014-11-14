'use strict';

var config = require('../config.js');

var args = require('yargs').argv;
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

function buildImagemin () {

	return gulp.src(config.images.src)
		.pipe(changed(config.images.dist))
		.pipe(imagemin())
		.pipe(gulp.dest(config.images.dist));

}

gulp.task('imagemin', ['static'], function () {

	return buildImagemin();

});

gulp.task('images', ['static', 'imagemin'], function() {

	if (args.watch) {
		gulp.watch(config.images.src, ['imagemin']);
	}

});
