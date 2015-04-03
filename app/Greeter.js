'use strict';

class Greeter {
  constructor(greeting) {
    this.greeting = greeting || 'Hello, world!';
  }

  getGreeting() {
    return this.greeting;
  }
}

module.exports = Greeter;
