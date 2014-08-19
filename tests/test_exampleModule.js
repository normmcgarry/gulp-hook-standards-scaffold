'use strict';

var assert         = require('chai').assert;
var exampleModule = require('../app/exampleModule');

suite('example_module', function(){
    setup(function(){

    });

    suite('Greeter', function () {
        test('getGreeting should equal "hello world"', function(){
            var g = new exampleModule.Greeter();
            assert.strictEqual('hello world', g.getGreeting());
        });
    });
});
