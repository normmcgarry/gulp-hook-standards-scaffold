'use strict';

var args = require('yargs').argv;
var gulp = require("gulp");
var browserify = require('browserify');
var watchify = require('watchify');
var source = require("vinyl-source-stream");
var transform = require('vinyl-transform');

var path = require("path");
var connect = require('gulp-connect');
var uglify = require('gulp-uglify')
var streamify = require('gulp-streamify')
var gutil = require('gulp-util');
var concat = require("gulp-concat");
var exorcist = require("exorcist");
var plumber = require("gulp-plumber");
var bower = require('main-bower-files');
var concatsource = require("gulp-concat-sourcemap");

var config = require('./config.js');

function buildJavascript(b) {

  var task = b.bundle()
    .pipe(plumber())
    .pipe(source(config.scripts.output))
    .pipe(gutil.env.watch ? transform(function () { return exorcist(path.join(config.scripts.dist, config.scripts.output+".map")); }) : gutil.noop())
    .pipe(gutil.env.watch ? gutil.noop() : streamify(uglify()))
    .pipe(gulp.dest(config.scripts.dist));

  return task;
}

function buildBower() {
  return gulp.src(bower({debug:true, paths:'.'}))
    .pipe(gutil.env.watch ? concatsource("bower.js") : concat("bower.js"))
    .pipe(gutil.env.watch ? gutil.noop() : streamify(uglify()))
    .pipe(gulp.dest(config.scripts.dist));
}

function buildVendor() {
  return gulp.src(config.scripts.vendor)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(config.scripts.dist));
}

gulp.task("browserify", ["clean"], function() {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  });

  b.add(config.scripts.entry);

  if(args.watch) {

    b = watchify(b);

    b.on('update', function(ids) {

      var changed = b._recorded;

      gutil.log(gutil.colors.yellow(changed[0].file), 'was updated');

      var task = buildJavascript(b);

      if(config.server.livereload || args.livereload) {
        task.pipe(connect.reload());
      }
    });

    buildJavascript(b);
  }

  var task = buildJavascript(b);
  return task;
});

gulp.task("vendor", ["clean"], function() {
  if(args.watch) {
    gulp.watch(config.scripts.vendor, ["vendor-watch"]);
  }
  return buildVendor();
});

gulp.task("vendor-watch", function() {
  return buildVendor();
});

gulp.task("bower", ["clean"], function() {
  if(args.watch) {
    gulp.watch(config.scripts.bower, ["bower-watch"]);
  }
  return buildBower();
});

gulp.task("bower-watch", function() {
  return buildBower();
});

gulp.task("scripts", ["browserify", "vendor", "bower"]);
