'use strict';

var config = require('../config.js');

var args = require('yargs').argv;
var gulp = require('gulp');
var concat = require('gulp-concat');
var concatsource = require('gulp-concat-sourcemap');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var bower = require('main-bower-files');
var browserify = require('browserify');
var exorcist = require('exorcist');
var path = require('path');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var watchify = require('watchify');

function buildJavascript (b) {

	var task = b
    .bundle()
		.pipe(plumber({
			errorHandler: function(error) {
				gutil.log('Browserify error: ' + error);
			}
		}))
		.pipe(source(config.scripts.output))
		.pipe(args.watch ? transform(function () {
			return exorcist(path.join(config.scripts.dist, config.scripts.output + '.map'));
		}) : gutil.noop())
		.pipe(args.watch ? gutil.noop() : streamify(uglify()))
		.pipe(gulp.dest(config.scripts.dist));

	return task;

}

function buildBower() {

	var mainBowerFiles;

	try {
		mainBowerFiles = bower({debug: true, paths: '.'});
	} catch (error) {
		// bower_components folder does not exist, just print a warning and skip bower generation
		gutil.log(gutil.colors.red(error.message));
		return;
	}

	if (mainBowerFiles.length === 0) {
		gutil.log(gutil.colors.red('No bower components found, skipping bower.js generation'));
		return;
	}

	gutil.log(gutil.colors.yellow('Building: ' + mainBowerFiles.join('\n')));

	var task = gulp.src(mainBowerFiles)
		.pipe(plumber({
			errorHandler: function(error) {
				gutil.log('Browserify error: ' + error);
			}
		}))
		.pipe(args.watch ? concatsource('bower.js', {sourcesContent: true}) : concat('bower.js'))
		.pipe(args.watch ? gutil.noop() : uglify())
		.pipe(gulp.dest(config.scripts.dist));

	if (config.server.livereload || args.livereload) {
		task.pipe(connect.reload());
	}

	return task;

}

function buildVendor () {

	var task = gulp.src(config.scripts.vendor)
		.pipe(plumber({
			errorHandler: function(error) {
				gutil.log('Vendor error: ' + error);
			}
		}))
		.pipe(args.watch ? concatsource('vendor.js', {sourcesContent: true}) : concat('vendor.js'))
		.pipe(args.watch ? gutil.noop() : uglify())
		.pipe(gulp.dest(config.scripts.dist));

	if (config.server.livereload || args.livereload) {
		task.pipe(connect.reload());
	}

	return task;
}

gulp.task('browserify', ['clean'], function () {

	var b = browserify({
		cache: {},
		packageCache: {},
		fullPaths: true,
		debug: true
	});

	b.add(config.scripts.entry);

	if (args.watch) {

		b = watchify(b);

		b.on('update', function (ids) {

			var changed = b._recorded;

			gutil.log(gutil.colors.yellow(ids), 'was updated');

			var task = buildJavascript(b);

			if (config.server.livereload || args.livereload) {
				task.pipe(connect.reload());
			}

		});

	}

	return buildJavascript(b);

});

gulp.task('vendor', ['clean'], function() {

	return buildVendor();

});

gulp.task('bower', ['clean'], function () {

	return buildBower();

});

gulp.task('scripts', ['browserify', 'vendor', 'bower'], function () {

	if (args.watch) {
		gulp.watch(config.scripts.vendor, ['vendor']);
		gulp.watch(config.scripts.bower, ['bower']);
	}


});
