'use strict';

var args = require('yargs').argv;
var gulp = require("gulp");
var stylus = require("gulp-stylus");
var nib = require('nib');

var config = require("./config.js");

gulp.task("stylus", ["clean"], function() {
  return gulp.src(config.styles.src)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(config.styles.dist))
});

gulp.task("styles", ["stylus"], function() {

  if (args.watch)
    gulp.watch(config.styles.src, [ 'stylus' ]);

});
