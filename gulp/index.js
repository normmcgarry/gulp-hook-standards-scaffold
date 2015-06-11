'use strict';

var gulp = require('gulp');
var fs = require('fs');
var onlyScripts = require('./util/scriptFilter.js');
var connect = require('gulp-connect');

var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function (task) {
	require('./tasks/' + task);
});

var scriptStack = gulp.series( 'tests' , gulp.parallel( 'scripts-app' , 'scripts-vendor' , 'scripts-bower' ));

gulp.task( 'default', gulp.series( 'clean', gulp.parallel( scriptStack, 'static' , 'styles', 'images' ), 'version' ));

gulp.task( 'watch', function(){

  gulp.watch( config.scripts.src , gulp.series( 'scripts-app', 'reload' ));
  gulp.watch( config.scripts.vendor , gulp.series( 'scripts-vendor', 'reload' ));
  gulp.watch( config.bower + '**/*.js' , gulp.series( 'scripts-bower', 'reload' ));

  gulp.watch( config.styles.src , gulp.series( 'styles', 'reload' ));
  gulp.watch( config.static.src , gulp.series( 'static', 'reload' ));

  config.server.livereload = (config.server.livereload || args.livereload );
  connect.server(config.server);
  require('opn')('http://localhost:' + config.server.port);

});
