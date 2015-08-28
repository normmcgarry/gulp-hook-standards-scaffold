var _ = require('lodash');

module.exports = {
  create: function(config) {
    var defaults = require('./gulp/config');
    _.assign(defaults, config);

    var gulp = require('./gulp');

    return gulp;
  }
};
