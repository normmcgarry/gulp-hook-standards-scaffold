'use strict';

var config = require('../config.js');

var args = require('yargs').argv;
var gulp = require('gulp');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');

var nib = require('nib');

function buildStylus () {

	var task = gulp.src(config.styles.src)
		.pipe(changed(config.styles.dist))
		.pipe(stylus({use: [nib()]}))
		.pipe(gulp.dest(config.styles.dist));

	if (config.server.livereload || args.livereload) {
		task.pipe(connect.reload());
	}

	return task;

}

gulp.task('stylus', function () {

	return buildStylus();

});

gulp.task('styles', ['clean', 'stylus'], function () {

	if (args.watch) {
		gulp.watch(config.styles.src, ['stylus'])
	}

});
