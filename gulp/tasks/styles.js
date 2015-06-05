'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
//var changed = require('gulp-changed'); --> deprecated by gulp.lastRun
var csso = require('gulp-csso');
var stylus = require('gulp-stylus');
var nib = require('nib');

/*
** config.req = build ? ['clean'] : [];
** only run clean when building
*/

function styles(){
  return gulp.src(config.styles.entry, {since: gulp.lastRun('styles')})
    //.pipe(changed(config.styles.dist))

    .pipe(stylus({
      'use': [nib()],
      'include css': true,
      sourcemap: {
        inline: true
      }
    }))
    .on('error', function (error) {
      gutil.log('Stylus error: ' + error);
      this.emit('end');
    })

    .pipe(config.production ? csso() : gutil.noop())
    .pipe(gulp.dest(config.styles.dist))
    .pipe(browser.reload({stream: true}));
}

function log(){
  gutil.log(gutil.colors.yellow('Reloading styles...'));
}

function watch(){
  if (config.watch) {
    gulp.watch(config.styles.watch, gulp.series(log, styles));
  }
}
// main task
gulp.task('styles', styles);
