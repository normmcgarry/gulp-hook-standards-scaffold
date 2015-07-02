'use strict';

var dest = './dist';

var config = {

  flags: {
    minify: false,
    sourcemap: true
  },

  clean: {
    src: dest
  },

  styles: {
    src: './styles/**/*',
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
        reporter: 'spec'
      }
    }
  },

  lint: {
    src: ['./app/**/*.js', '!app/vendor/**/*.js', './tests/**/*.js']
  },

  scripts: {
    app: {
      src: ['./app/**/*.js', '!./app/vendor/**/*.js'],
      entry: './app/index.js',
      output: 'main.build.js'
    },
    bower: {
      src: './bower.json'
    },
    vendor: {
      src: './app/vendor/**/*.js'
    },
    dist: dest + '/js/'
  },

  server: {
    root: dest,
    port: 8080
  },

  version: {
    css: dest + '/css/*.css',
    cssDist: dest + '/css/',

    html: dest + '/*.html',
    htmlDist: dest + '/',

    js: dest + '/js/*.js',
    jsDist: dest + '/js/',

    jsMap: dest + '/js/*.map',
    jsMapDist: dest + '/js/',
  },

  bower: './bower_components/'

};

module.exports = config;
