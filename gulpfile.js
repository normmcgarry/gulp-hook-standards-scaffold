'use strict';

var args    = require('yargs').argv;
var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');

require('./gulp/images.js');
require('./gulp/styles.js');
require('./gulp/scripts.js');
require('./gulp/static.js');
require('./gulp/tests.js');

var config = require('./gulp/config.js');

gulp.task("clean", function() {
	return gulp.src(config.clean.src, { read: false})
		.pipe(clean({force:true}));
});

gulp.task("build", ["tests", "compile"]);
gulp.task("compile", ["tests", "clean", "scripts", "images", "styles", "static"]);
gulp.task("default", ["build"], function() {
	if(args.watch) {
		config.server.livereload = (config.server.livereload || args.livereload);
  	connect.server(config.server);
	}
});
