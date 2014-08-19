'use strict';

var gulp = require("gulp");
var browserify = require('browserify');
var watchify = require('watchify');

var config = require('./config.js');

gulp.task("browserify", ["clean"], function() {
  var compiler = (args.watch ? watchify : browserify);


});

gulp.task("scripts", ["browserify"]);
