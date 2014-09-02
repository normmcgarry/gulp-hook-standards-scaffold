'use strict';

var config = {
  clean: {
    src: './dist/'
  },
  styles: {
    src: ['./styles/**/*.styl'],
    dist: './dist/css/'
  },
  static: {
    src: ['./static/**/*'],
    dist: './dist/'
  },
  tests: {
    src: ["./tests/**/*.js"],
    mocha: {
      config: {
        ui: "tdd",
        reporter:"spec"
      }
    }
  },
  lint: {
    src: ["./app/**/*.js", "./tests/**/*.js"]
  },
  scripts: {
    entry: "./app/index.js",
    output: "main.build.js",
    dist: "./dist/js/"
  },
  server: {
    root: "./dist/",
    port: 8080,
    livereload: false
  }
};

module.exports = config;
