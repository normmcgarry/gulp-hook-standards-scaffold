'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var bower = require('main-bower-files');
var concat = require('gulp-concat');

gulp.task('scripts-bower', function(){

  var mainBowerFiles;

  try {
    mainBowerFiles = bower({debug: true, paths: '.'});
  } catch (error) {
    gutil.log(error.message);
    return;
  }

  return gulp.src(mainBowerFiles)
    .pipe(concat('bower.js'))
    .pipe(gulp.dest(config.scripts.dist));

});
