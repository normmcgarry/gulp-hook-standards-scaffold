'use strict';

var gulp = require('gulp');

gulp.task('build', build);

function build(){
  gulp.parallel('tests', 'clean', 'static', 'scripts', 'styles', 'images');
}
