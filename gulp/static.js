'use strict';

var args = require('yargs').argv;
var gulp = require('gulp');

var config = require('./config.js');

gulp.task("static", ["clean"], function() {
	return gulp.src(config.static.src)
		.pipe(gulp.dest(config.static.dist));
});
