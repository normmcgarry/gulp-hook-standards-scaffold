'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('watch', ['tests', 'static', 'scripts', 'styles', 'images'], function() {

  browser.init({
        server: {
            baseDir: config.server.root
        },
        ghostMode: {
          clicks: false,
          forms: false,
          scroll: false
        }
    });

	gutil.log(gutil.colors.bgGreen('Watching for changes...'));

});
