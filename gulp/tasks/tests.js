'use strict';

var config = require('../config.js');

var args = require('yargs').argv;
var gulp = require('gulp');
var cache = require('gulp-cached');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var jshintStylish = require('jshint-stylish');

gulp.task('lint', function () {

	return gulp.src(config.lint.src)
		.pipe(cache('lint'))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(jshintStylish));

});

gulp.task('mocha', function () {

	return gulp.src(config.tests.src)
		.pipe(mocha(config.tests.mocha.config));

});

gulp.task('tests', ['lint', 'mocha'], function() {

	if (args.watch) {
		gulp.watch(config.lint.src, ['lint', 'mocha']);
		gulp.watch(config.tests.src, ['lint', 'mocha']);
	}

});
