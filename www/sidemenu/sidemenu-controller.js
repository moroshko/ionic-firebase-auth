'use strict';

angular.module('MyApp.controllers').controller('SideMenuCtrl', 
  function($scope, $state, Auth) {
    $scope.logout = function() {
      Auth.logout();
      $state.go('login');
    };
  });
