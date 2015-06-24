'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var bower = require('main-bower-files');
var concatsource = require('gulp-concat-sourcemap');

gulp.task('scripts-bower', function(){

  var mainBowerFiles;

  try {
    mainBowerFiles = bower({debug: true, paths: '.'});
  } catch (error) {
    gutil.log(error.message);
    return;
  }

  return gulp.src(mainBowerFiles)
    .pipe(concatsource('bower.js', {sourcesContent: true}))
    .pipe(gulp.dest(config.scripts.dist));
});
