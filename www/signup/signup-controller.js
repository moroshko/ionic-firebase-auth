'use strict';

angular.module('MyApp.controllers').controller('SignupCtrl', 
  function($scope, $q, $state, $ionicLoading, Auth, User, Signup) {
    var password = Signup.randomPassword();

    $scope.user = {
      email: ''
    };
    $scope.errorMessage = null;

    $scope.signup = function() {
      $scope.errorMessage = null;

      $ionicLoading.show({
        template: 'Please wait...'
      });

      createAuthUser().then(sendPasswordResetEmail)
                      .then(login)
                      .then(createMyAppUser)
                      .then(goToChangePassword)
                      .catch(handleError);
    };

    function createAuthUser() {
      return Auth.createUser($scope.user.email, password);
    }

    function sendPasswordResetEmail(authUser) {
      var defer = $q.defer();

      Auth.sendPasswordResetEmail(authUser.email).then(function() {
        defer.resolve(authUser);
      });

      return defer.promise;
    }

    function login(authUser) {
      return Auth.login(authUser.email, password);
    }

    function createMyAppUser(authUser) {
      return User.create(authUser.uid, authUser.email);
    }

    function goToChangePassword() {
      $ionicLoading.hide();
      $state.go('change-password');
    }

    function handleError(error) {
      switch (error.code) {
        case 'INVALID_EMAIL':
          $scope.errorMessage = 'Invalid email';
          break;
        case 'EMAIL_TAKEN':
          $scope.errorMessage = 'Email already exists';
          break;
        default:
          $scope.errorMessage = 'Error: [' + error.code + ']';
      }

      $ionicLoading.hide();
    }
  });
