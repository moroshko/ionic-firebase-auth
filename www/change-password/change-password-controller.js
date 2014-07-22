'use strict';

angular.module('MyApp.controllers').controller('ChangePasswordCtrl',
  function($scope, $state, $ionicLoading, Auth, User) {
    var passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

    $scope.user = {
      oldPassword: '',
      newPassword: ''
    };
    $scope.passwordValid = true;
    $scope.errorMessage = null;

    $scope.isFirstPasswordChange = !User.hasChangedPassword();

    if ($scope.isFirstPasswordChange) {
      $scope.passwordLabel = 'Temporary Password';
      $scope.passwordPlaceholder = 'You\'ll find it in the email we sent you';
    } else {
      $scope.passwordLabel = 'Current Password';
      $scope.passwordPlaceholder = 'Your current password';
    }

    $scope.done = function() {
      $scope.passwordValid = passwordStrengthRegex.test($scope.user.newPassword);

      if (!$scope.passwordValid) {
        return;
      }

      $scope.errorMessage = null;

      $ionicLoading.show({
        template: 'Please wait...'
      });

      Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(User.recordPasswordChange)
          .then(goToDashboard)
          .catch(handleError);
    };

    function goToDashboard() {
      $ionicLoading.hide();
      $state.go('app.dashboard');
    }

    function handleError(error) {
      switch (error.code) {
        case 'INVALID_PASSWORD':
          $scope.errorMessage = 'Invalid password';
          break;
        default:
          $scope.errorMessage = 'Error: [' + error.code + ']';
      }

      $ionicLoading.hide();
    }
  });
