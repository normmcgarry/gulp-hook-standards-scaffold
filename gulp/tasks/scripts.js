'use strict';

var config = require('../config');
var browser = require('../browser');

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var concatsource = require('gulp-concat-sourcemap');
var stripDebug = require('gulp-strip-debug');

var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var bower = require('main-bower-files');
var browserify = require('browserify');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

function app(){
  var bundler = browserify(config.scripts.entry, {
    debug: !config.production,
    cache: {}
  });

  function rebundle() {
    return bundler.bundle()

      .on('error', function (error) {
        gutil.log('Browserify error: ' + error);
      })

      .pipe(source(config.scripts.output))
      .pipe(config.production ? streamify(stripDebug()) : gutil.noop())

      .pipe(config.production ? gutil.noop() : buffer())
      .pipe(config.production ? gutil.noop() : sourcemaps.init({loadMaps: true}))
      .pipe(config.production ? gutil.noop() : sourcemaps.write('./'))

      .pipe(config.production ? buffer() : gutil.noop())
      .pipe(config.production ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest(config.scripts.dist))
      .pipe(browser.reload({stream: true}));
  };

  bundler.on('update', rebundle);

  return rebundle();
}

function vendor(){
  return gulp.src(config.scripts.vendor)
    .on('error', function (error) {
      gutil.log('Vendor error: ' + error);
    })
    .pipe(config.production ? concat('vendor.js') : concatsource('vendor.js', {sourcesContent: true}))
    .pipe(config.production ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest(config.scripts.dist))
    .pipe(browser.reload({stream: true}));
}

function watch(){
  if (config.watch) {
    gulp.watch(config.scripts.app, gulp.series(logApp, 'app'));
    gulp.watch(config.scripts.bower, gulp.series(logBower, 'bower'));
    gulp.watch(config.scripts.vendor, gulp.series(logVendor, 'vendor'));
  }
}

function bowerComponents(){
    var mainBowerFiles;

    try {
      mainBowerFiles = bower({debug: true, paths: '.'});
    } catch (error) {
      // bower_components folder does not exist, just print a warning and skip bower generation
      gutil.log(gutil.colors.red(error.message));
      return;
    }

    if (mainBowerFiles.length === 0) {
      gutil.log(gutil.colors.red('No bower components found, skipping bower.js generation'));
      return;
    }

    gutil.log(gutil.colors.yellow('Building: ' + mainBowerFiles.join('\n')));

    return gulp.src(mainBowerFiles)
      .on('error', function (error) {
        gutil.log('Bower error: ' + error);
      })
      .pipe(config.production ? concat('bower.js') : concatsource('bower.js', {sourcesContent: true}))
      .pipe(config.production ? streamify(uglify()) : gutil.noop())
      .pipe(gulp.dest(config.scripts.dist))
      .pipe(browser.reload({stream: true}));
}

function logApp(){
  gutil.log(gutil.colors.yellow('Reloading app...'));

}

function logBower(){
  gutil.log(gutil.colors.yellow('Reloading bower...'));
}

function logVendor() {
  gutil.log(gutil.colors.yellow('Reloading vendor...'));
}


/*
** config.req = build ? ['clean'] : [];
** only run clean when building
*/

gulp.task('app', gulp.parallel('env', 'clean', app));
gulp.task('bower', bowerComponents);
gulp.task('vendor', vendor);

// main task
gulp.task('scripts', gulp.parallel('app', 'bower', 'vendor', watch));
