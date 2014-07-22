'use strict';

angular.module('MyApp.controllers').controller('ResetPasswordCtrl', 
  function($scope, $ionicLoading, Auth) {
    $scope.user = {
      email: ''
    };
    $scope.errorMessage = null;

    $scope.resetPassword = function() {
      $scope.errorMessage = null;

      $ionicLoading.show({
        template: 'Please wait...'
      });

      Auth.sendPasswordResetEmail($scope.user.email)
          .then(showConfirmation)
          .catch(handleError);
    };

    function showConfirmation() {
      $scope.emailSent = true;
      $ionicLoading.hide();
    }

    function handleError(error) {
      switch (error.code) {
        case 'INVALID_EMAIL':
        case 'INVALID_USER':
          $scope.errorMessage = 'Invalid email';
          break;
        default:
          $scope.errorMessage = 'Error: [' + error.code + ']';
      }

      $ionicLoading.hide();
    }
  });
