'use strict';

var config = require('./config');
var Greeter = require('./Greeter');

var g = new Greeter();

console.log(g.getGreeting());

//Babel / ES6 test
class Test {
  test() {
    console.log('test');
  }
}

var test = new Test;
test.test();