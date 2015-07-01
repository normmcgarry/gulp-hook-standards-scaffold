'use strict'

// vars
var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('./config');

// two more states to minify code and create sourcemaps. The default is for local development.
gulp.task('dev', function () {
  config.flags.minify = true;
  config.flags.sourcemap = true;
  return gulp.src('.')
});

gulp.task('prod', function () {
  config.flags.minify = true;
  config.flags.sourcemap = false;
  return gulp.src('.')
});

// define stackable tasks
gulp.task('styles', require('./tasks/styles')( gulp, config.styles, config.flags ));
gulp.task('clean', require('./tasks/clean')( gulp, config.clean ));
gulp.task('images', require('./tasks/images')( gulp, config.images ));
gulp.task('reload', require('./tasks/reload')( gulp, config.server ));
gulp.task('scripts-app', require('./tasks/scripts-app')( gulp, config.scripts, config.flags ));
gulp.task('scripts-bower', require('./tasks/scripts-bower')( gulp, config.scripts, config.flags ));
gulp.task('scripts-vendor', require('./tasks/scripts-vendor')( gulp, config.scripts, config.flags ));
gulp.task('static', require('./tasks/static')( gulp, config.static ));
gulp.task('tests-mocha', require('./tasks/tests-mocha')( gulp, config.tests ));
gulp.task('tests-jshint', require('./tasks/tests-jshint')( gulp, config.tests ));
gulp.task('version', require('./tasks/version')( gulp, config.version ));


// define watch actions
gulp.task('watch', function(){

  gulp.watch(config.scripts.src , gulp.series('scripts-app', 'reload'));
  gulp.watch(config.scripts.vendor , gulp.series('scripts-vendor', 'reload'));
  gulp.watch(config.bower + '**/*.js' , gulp.series('scripts-bower', 'reload'));

  gulp.watch(config.styles.src , gulp.series( 'styles', 'reload' ));
  gulp.watch(config.static.src , gulp.series( 'static', 'reload' ));

  config.server.livereload = true;
  connect.server(config.server);
  require('opn')('http://localhost:' + config.server.port);

});

// define user commands
gulp.task('build', gulp.series('clean', gulp.parallel('tests-mocha', 'tests-jshint'), gulp.parallel('static', 'scripts-app', 'scripts-vendor', 'scripts-bower', 'styles' )));

gulp.task('build-dev' , gulp.series('dev', 'build', 'watch' ));

gulp.task('build-prod' , gulp.series('prod', 'build', 'watch' ));

gulp.task('default' , gulp.series('build' , 'version' , 'watch'));
