'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task( 'clean', function(){

  return gulp.src( config.clean.src, { read: false } )
    .pipe( clean( { force: true } ) );

});
