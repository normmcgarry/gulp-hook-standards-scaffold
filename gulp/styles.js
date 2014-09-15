'use strict';

var args = require('yargs').argv;
var gulp = require("gulp");
var stylus = require("gulp-stylus");
var nib = require('nib');

var connect = require('gulp-connect');
var config = require('./config.js');
var changed = require('gulp-changed');

function getStylusStream() {

	var task = gulp.src(config.styles.src)
		.pipe(changed(config.styles.dist))
		.pipe(stylus({use: [nib()]}))
		.pipe(gulp.dest(config.styles.dist));

	if(config.server.livereload || args.livereload){
		task.pipe(connect.reload());
	}

	return task;

}

gulp.task("stylus", ["clean"], function() {

	return getStylusStream();

});

gulp.task("stylus-watch", function() {

	return getStylusStream();

});



gulp.task("styles", ["stylus"], function() {
	if (args.watch){
		gulp.watch(config.styles.src, [ 'stylus-watch' ])
	}
});
