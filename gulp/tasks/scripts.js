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
var gutil = require('gulp-util');

var bower = require('main-bower-files');
var browserify = require('browserify');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var watchify = require('watchify');

var hbsfy = require("hbsfy").configure({
  extensions: ["html"]
});

/*
** config.req = build ? ['clean'] : [];
** only run clean when building
*/

gulp.task('do-app', ['env'].concat(config.req), function () {

  var bundler = browserify(config.scripts.entry, {
    debug: !config.production,
    cache: {}
  });

  var rebundle = function() {
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

});

gulp.task('do-bower', config.req, function () {

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

});

gulp.task('do-vendor', config.req, function() {

  return gulp.src(config.scripts.vendor)
    .on('error', function (error) {
      gutil.log('Vendor error: ' + error);
    })
    .pipe(config.production ? concat('vendor.js') : concatsource('vendor.js', {sourcesContent: true}))
    .pipe(config.production ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest(config.scripts.dist))
    .pipe(browser.reload({stream: true}));

});


// watch tasks

gulp.task('reload-app', ['do-app'], function () {

  gutil.log(gutil.colors.yellow('Reloading app...'));

});

gulp.task('reload-bower', ['do-bower'], function () {

  gutil.log(gutil.colors.yellow('Reloading bower...'));

});

gulp.task('reload-vendor', ['do-vendor'], function () {

  gutil.log(gutil.colors.yellow('Reloading vendor...'));

});


// main task

gulp.task('scripts', ['do-app', 'do-bower', 'do-vendor'], function () {

  if (config.watch) {
    gulp.watch(config.scripts.app, ['reload-app']);
    gulp.watch(config.scripts.bower, ['reload-bower']);
    gulp.watch(config.scripts.vendor, ['reload-vendor']);
  }

});
