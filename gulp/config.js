'use strict';

var config = {
  clean: {
    src: './dist/'
  },
  styles: {
    src: ['./stlyes/**/*.styl'],
    dist: './dist/css/'
  },
  static: {
    src: ['./static/'],
    dist: './dist/'
  },
  tests: {
    src: ["./tests/**/*.js"]
  },
  lint: {
    src: ["./app/**/*.js"]
  },
  scripts: {

  }
};

module.exports = config;
