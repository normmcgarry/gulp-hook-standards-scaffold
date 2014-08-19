'use strict';

var gulp = require("gulp");
var stylus = require("gulp-stylus");
var nib = require('nib');

var config = require("./config.js");

gulp.task("stylus", ["clean"], function() {

  if (args.watch)
    gulp.watch(config.styles.src, [ 'styles' ]);

  return gulp.src(config.styles.src)
      .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(config.styles.dist))
});

gulp.task("styles", ["stylus"]);
