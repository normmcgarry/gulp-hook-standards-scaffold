'use strict';

var gulp = require('gulp');
var config = require('../config');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var clean = require('gulp-clean');

gulp.task('minify', function(){

  gulp.src(config.styles.dist + 'index.css')
    .pipe(csso())
    .pipe(gulp.dest(config.styles.dist));

  gulp.src(config.scripts.dist + 'vendor.js')
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.scripts.dist));

  gulp.src(config.scripts.dist + 'vendor.js.map')
    .pipe(clean());

  gulp.src(config.scripts.dist + 'bower.js')
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.scripts.dist));

  gulp.src(config.scripts.dist + 'bower.js.map')
    .pipe(clean());

  return gulp.src(config.scripts.dist + 'main.build.js')
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.scripts.dist));
});
