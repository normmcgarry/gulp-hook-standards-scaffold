var _ = require('lodash');

module.exports = {
  create: function(config) {
    var defaults = require('./config');
    _.assign(defaults, config);

    var gulp = require('./gulp');

    return gulp;
  }
};
