var gulp = require('gulp');
var gutil = require('gulp-util');
var args = require('yargs').argv;
var config = require('../config.js');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var del = require('del');
var replace = require('gulp-replace');
var clean = require('gulp-clean');


gulp.task('version', function(cb) {

  var date = new Date();
  var version;

  if( !args.version ){
    version = date.getTime();
  } else {
    version = args.version.toString().replace( /[^\w.-]+/g ,"");
  }

  //inject the date and version into a new CSS file
  gulp.src(config.styles.dist + 'index.css')
    .pipe(inject.prepend('/* Created: ' + date + '*/\n/* Version: ' + version + '*/\n'))
    .pipe(rename('index.' + version + '.css'))
    .pipe(gulp.dest(config.styles.dist));

  gulp.src(config.styles.dist + 'index.css')
    .pipe(clean());

  //inject the date and version into a new JS files
  injectJSComments(config.scripts.dist + config.scripts.output, version, date);
  injectJSComments(config.scripts.dist + 'bower.js', version, date);
  injectJSComments(config.scripts.dist + 'vendor.js', version, date);

  //inject the date and version into the index.html file
  //update references to the new CSS and JS files
  return gulp.src(config.static.dist + '/index.html')
    .pipe(inject.append('<!-- Version: ' + version + ' -->\n'))
    .pipe(inject.append('<!-- Created: ' + date + ' -->'))
    .pipe(replace('index.css', 'index.' + version + '.css'))
    .pipe(replace('<html', '<html data-version="'+ version +'"'))
    .pipe(replace(config.scripts.output, 'main.build.' + version + '.js'))
    .pipe(replace('bower.js', 'bower.' + version + '.js'))
    .pipe(replace('vendor.js', 'vendor.' + version + '.js'))
    .pipe(gulp.dest(config.static.dist));
});


function injectJSComments(file, version, date){

  gulp.src(file)
    .pipe(inject.prepend('/* Created: ' + date + ' */\n'))
    .pipe(inject.prepend('/* Version: ' + version + ' */\n'))
    .pipe(rename( file.split('.js')[0] + '.' + version + '.js'))
    .pipe(gulp.dest('.'));

  gulp.src(file)
    .pipe(clean());

}
