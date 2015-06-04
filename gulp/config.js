'use strict';

var args = require('yargs').argv;

var production = args.prod ? true : false;

var build = args._.length ? args._[0] === 'build' : false;
var watch = args._.length ? args._[0] === 'watch' : true;

var req = build ? ['clean'] : [];
var dest = watch ? './.tmp' : './dist';

var config = {

	build : build,

	watch : watch,

	req : req,

	production : production,

	clean: {
		src: ['./.tmp', './dist']
	},

  env: {
    dev: './env/dev.json',
    prod: './env/prod.json',

    dist: './app/config',
    name: 'env.json'
  },

	styles: {
		watch: ['./styles/**/*', './app/**/*.{css,styl}'],
		entry: './styles/index.styl',
		dist: dest + '/css/'
	},

	static: {
		src: ['./static/**/*', '!./static/images/**/*.{gif,jpg,png,svg}'],
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
		entry: './app/index.js',
		output: 'main.build.js',
		dist: dest + '/js/',

		vendor: ['./app/vendor/jquery.js', './app/vendor/**/*.js'],
    bower: './bower_components/**/*.js',
    app: ['./app/**/*.{js,html}', '!./app/vendor/**/*']
	},

	server: {
		root: dest
	},

	bower: './bower_components/'

};

module.exports = config;
