'use strict';

var config = require('../config');

var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (cb) {

	del.sync(config.clean.src, {force: true});
	cb();

});
