'use strict';

function Greeter () {
    this.getGreeting = function (){
        return "hello world";
    }
}

module.exports.Greeter = Greeter;
