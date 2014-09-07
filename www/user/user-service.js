'use strict';

angular.module('MyApp.services').service('User',
  function($q, $firebase, FIREBASE_ROOT, Auth) {
    var usersRef = new Firebase(FIREBASE_ROOT + '/users');
    var currentUser = null;

    this.loadCurrentUser = function() {
      var defer = $q.defer();
      var currentUserRef = usersRef.child(Auth.currentUser.uid);
      currentUser = $firebase(currentUserRef).$asObject();
      currentUser.$loaded()
        .then(function(data){
          defer.resolve();
        })

      return defer.promise;
    };

    this.create = function(id, email) {
      var users = $firebase(usersRef);

      return users.$child(id).$set({ email: email });
    };

    this.recordPasswordChange = function() {
      currentUser.passwordLastChangedAt = Math.floor(Date.now() / 1000);
      return currentUser.$save();
    };

    this.hasChangedPassword = function() {
      return angular.isDefined(currentUser.passwordLastChangedAt);
    };
  });
