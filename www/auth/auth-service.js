'use strict';

angular.module('MyApp.services').service('Auth',
  function($q, FIREBASE_ROOT, $firebaseSimpleLogin) {
    var self = this;
    var firebaseSimpleLogin = $firebaseSimpleLogin(new Firebase(FIREBASE_ROOT));

    this.currentUser = null;

    this.getCurrentUser = function() {
      var defer = $q.defer();
      
      firebaseSimpleLogin.$getCurrentUser().then(function(user) {
        self.currentUser = user;
        
        if (user === null) {
          defer.reject();
        } else {
          defer.resolve(user);
        }
      });

      return defer.promise;
    };

    this.createUser = function(email, password) {
      var defer = $q.defer();

      firebaseSimpleLogin.$createUser(email, password).then(
        function(user) {
          self.currentUser = user;
          defer.resolve(user);
        },
        function(error) {
          self.currentUser = null;
          defer.reject(error);
        });

      return defer.promise;
    };

    this.login = function(email, password) {
      var defer = $q.defer();

      firebaseSimpleLogin.$login('password', { email: email, password: password }).then(
        function(user) {
          self.currentUser = user;
          defer.resolve(user);
        },
        function(error) {
          self.currentUser = null;
          defer.reject(error);
        });

      return defer.promise;
    };

    this.logout = function() {
      firebaseSimpleLogin.$logout();
      this.currentUser = null;
    };

    this.sendPasswordResetEmail = function(email) {
      return firebaseSimpleLogin.$sendPasswordResetEmail(email);
    };

    this.changePassword = function(oldPassword, newPassword) {
      return firebaseSimpleLogin.$changePassword(this.currentUser.email, oldPassword, newPassword);
    };
  });
