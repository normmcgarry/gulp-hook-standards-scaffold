'use strict';

var args    = require('yargs').argv;
var gulp = require('gulp');
var clean = require('gulp-clean');

require('./gulp/styles.js');
require('./gulp/scripts.js');
require('./gulp/static.js');
require('./gulp/tests.js');

gulp.task("clean", function() {
	return gulp.src(config.clean.src)
		.pipe(clean());
});

gulp.task("build", ["tests"], function() {
  return gulp.run("compile");
});

gulp.task("compile", ["scripts", "styles", "static"]);

gulp.task("default", ["build"]);
