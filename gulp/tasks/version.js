/**
 * Injects a timestamp into CSS, JS, and HTML files and renames the files.
 * @tasks/clean
 */

'use strict';

var clean = require('gulp-clean');
var gutil = require('gulp-util');
var args = require('yargs').argv;
var config = require('../config.js');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var del = require('del');
var replace = require('gulp-replace');

/**
 * @param gulp - function
 * @param options - object
 * options.src : Directory to delete.
 * @returns {Function}
 */
module.exports = function( gulp, options ) {

  return function(){

    var date = new Date();
    var version;

    if( !args.version ){
      version = date.getTime();
    } else {
      version = args.version.toString().replace( /[^\w.-]+/g ,"");
    }

    gulp.src( options.css )
      .pipe( inject.prepend( '/* Created: ' + date + '*/\n/* Version: ' + version + '*/\n'))
      .pipe( rename( function( path ) {
        path.basename += "." + version;
      }))
      .pipe( clean() )
      .pipe( gulp.dest( options.cssDist ));

    // delete the old ones
    gulp.src( options.css )
      .pipe( clean() );

    //inject the date and version into a new JS files
    gulp.src( options.js )
      .pipe( inject.prepend('/* Created: ' + date + ' */\n'))
      .pipe( inject.prepend('/* Version: ' + version + ' */\n'))
      .pipe( rename(function (path) {
        path.basename += "." + version;
      }))
      .pipe( gulp.dest( options.jsDist ));

    // delete the old ones
    gulp.src( options.js )
      .pipe( clean() );

    //inject the date and version into the index.html file
    //update references to the new CSS and JS files
    return gulp.src( options.html )
      .pipe(inject.append('<!-- Version: ' + version + ' -->\n'))
      .pipe(inject.append('<!-- Created: ' + date + ' -->'))
      .pipe(replace('index.css', 'index.' + version + '.css'))
      .pipe(replace('<html', '<html data-version="'+ version +'"'))
      .pipe(replace(config.scripts.output, 'main.build.' + version + '.js'))
      .pipe(replace('bower.js', 'bower.' + version + '.js'))
      .pipe(replace('vendor.js', 'vendor.' + version + '.js'))
      .pipe(gulp.dest( options.htmlDist ));
  }

}


