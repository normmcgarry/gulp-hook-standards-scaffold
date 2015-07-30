/**
 * Runs jscs tests.
 * @tasks/bump
 */

'use strict';

var bump = require('gulp-bump');
var args = require('yargs').argv;

/**
 * @param gulp - function
 * @param options - object
 * options.src : Files to validate.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function() {

    var option = {
      type: args.to
    };

    return gulp.src( options.src )
      .pipe(bump())
      .pipe(gulp.dest('./'))
      .on('error', function(error) {
        console.log(error.message);
      });

  };

};
