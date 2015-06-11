'use strict';

var dest = './dist';

var config = {

	clean: {
		src: './dist'
	},

  styles: {
		watch: './styles/**/*',
		entry: './styles/index.styl',
		dist: dest + '/css/'
	},

	static: {
		src: ['./static/**/*'],
		dist: dest
	},

	images: {
		src: ['./static/images/**/*.{gif,jpg,png,svg}'],
		dist: dest + '/images/'
	},

	tests: {
		src: ['./tests/**/*.js'],
		mocha: {
			config: {
				ui: 'tdd',
				reporter:'spec'
			}
		}
	},

	lint: {
		src: ['./app/**/*.js', '!app/vendor/**/*.js', './tests/**/*.js']
	},

	scripts: {
		watch: './app/**/*.js',
		entry: './app/index.js',
		output: 'main.build.js',
		dist: dest + '/js/',
		vendor: './app/vendor/**/*.js'
	},

	server: {
		root: './.tmp',
		port: 8080,
		livereload: true
	},

	bower: './bower_components/'

};

module.exports = config;
