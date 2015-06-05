'use strict';

var config = require('../config');

var gulp = require('gulp');
var del = require('del');

gulp.task('clean', clean);

function clean(cb){
  del.sync(config.clean.src, {force: true});
  cb();
}
