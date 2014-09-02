'use strict';

var args = require('yargs').argv;
var gulp = require('gulp');

var config = require("./config.js");

var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');

var jshintstlish = require("jshint-stylish");

gulp.task('lint', function () {
	gulp.src(config.lint.src)
		.pipe(cache("lint"))
		.pipe(jshint('.jshintrc'))
  	.pipe(jshint.reporter(jshintstlish));
});

gulp.task('mocha', function () {
	gulp.src(config.tests.src)
    .pipe(mocha(config.tests.mocha.config));
});

gulp.task('tests', ['lint', 'mocha'], function() {

	if(args.watch) {
		gulp.watch(config.lint.src, ['lint', 'mocha']);
		gulp.watch(config.tests.src, ['lint', 'mocha']);
	}

});
