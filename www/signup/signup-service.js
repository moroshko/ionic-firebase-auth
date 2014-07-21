'use strict';

angular.module('MyApp.services').service('Signup', function() {
  this.randomPassword = function() {
    var chars = 'abdfhijkprstuvwxyzACGHJKLMNPQRUVWXY34679';
    var charsCount = chars.length;
    var password = '';
    
    for (var i = 0; i < 10; i++) {
      password += chars[Math.floor(charsCount * Math.random())];
    }

    return password;
  };
});
