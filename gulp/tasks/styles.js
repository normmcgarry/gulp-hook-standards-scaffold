'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');

gulp.task('styles', function () {

  return gulp.src( config.styles.entry /*, {since: gulp.lastRun('styles')}*/ )
    .pipe( stylus({
      'use': [ nib() ],
      'include css': true,
      sourcemap: {
        inline: true
      }
    }))
    .pipe( gulp.dest( config.styles.dist ));

});
