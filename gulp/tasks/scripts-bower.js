'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var bower = require('main-bower-files');
var gutil = require('gulp-util');
var concatsource = require('gulp-concat-sourcemap');
var concat = require('gulp-concat');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

gulp.task('scripts-bower', function(){

  var mainBowerFiles;

  try {
    mainBowerFiles = bower({debug: true, paths: '.'});
  } catch (error) {
    gutil.log(error.message);
    return;
  }

  return gulp.src(mainBowerFiles)
    .on('error', function (error) {
      gutil.log('scripts-bower error: ' + error);
    })
    .pipe(concatsource('bower.js', {sourcesContent: true}))
    .pipe(gulp.dest(config.scripts.dist));

});
