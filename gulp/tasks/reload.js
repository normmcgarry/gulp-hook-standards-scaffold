'use strict';

var gulp = require('gulp');
var config = require('../config');
var connect = require('gulp-connect');

gulp.task('reload', function(){

  return gulp.src(config.server.root)
    .pipe(connect.reload());

})
