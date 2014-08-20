'use strict';

var Greeter = function(greeting) {
  this.greeting = greeting || "hello world";
};

Greeter.prototype.getGreeting = function() {
  return this.greeting;
};

module.exports = Greeter;
