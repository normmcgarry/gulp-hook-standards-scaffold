'use strict';

var args = require('yargs').argv;
var gulp = require('gulp');

var config = require('./config.js');
var changed = require('gulp-changed');

gulp.task("copy", ["clean"], function() {
	return gulp.src(config.static.src)
		.pipe(changed(config.static.dist))
		.pipe(gulp.dest(config.static.dist));
})

gulp.task("static", ["copy"], function() {

	if(args.watch) {
		gulp.watch(config.static.src, ["copy"]);
	}

});
