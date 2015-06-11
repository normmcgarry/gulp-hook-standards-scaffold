'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('static', function(){

  return gulp.src(config.static.src /*, {since: gulp.lastRun('static')}*/ )
    .pipe(gulp.dest(config.static.dist));

});
