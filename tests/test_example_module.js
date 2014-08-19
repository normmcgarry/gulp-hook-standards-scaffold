'use strict';

var assert         = require('chai').assert;
var example_module = require('../app/example_module');

suite('example_module', function(){
    setup(function(){

    });

    suite("Greeter", function () {
        test('getGreeting should equal "hello world"', function(){
            var g = new example_module.Greeter();
            assert.strictEqual("hello world", g.getGreeting());
        });
    });
});
