'use strict';

var config = require('../config.js');

var args = require('yargs').argv;
var gulp = require('gulp');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var csso = require('gulp-csso');
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');

var nib = require('nib');

function buildStylus () {

	var task = gulp.src(config.styles.entry)
		.pipe(changed(config.styles.dist))
		.pipe(stylus({
			'use': [nib()],
			'include css': true
		}))
		.pipe(args.watch ? gutil.noop() : csso())
		.pipe(gulp.dest(config.styles.dist));

	if (config.server.livereload || args.livereload) {
		task.pipe(connect.reload());
	}

	return task;

}

gulp.task('stylus', ['clean'], function () {

	return buildStylus();

});

gulp.task('styles', ['stylus'], function () {

	if (args.watch) {
		gulp.watch(config.styles.src, ['stylus'])
	}

});
