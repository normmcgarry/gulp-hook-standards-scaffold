'use strict';

var config = require('../config.js');

var args = require('yargs').argv;
var gulp = require('gulp');
var connect = require('gulp-connect');
var changed = require('gulp-changed');

function copyStream () {

	var task = gulp.src(config.static.src)
		.pipe(changed(config.static.dist))
		.pipe(gulp.dest(config.static.dist));

	if (config.server.livereload || args.livereload) {
		task.pipe(connect.reload());
	}

	return task;

}

gulp.task('copy', function() {

	return copyStream();

});

gulp.task('static', ['clean', 'copy'], function() {

	if (args.watch) {
		gulp.watch(config.static.src, ['copy']);
	}

});
