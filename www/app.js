'use strict';

angular.module('MyApp', [
  'ionic',
  'firebase',
  'MyApp.services',
  'MyApp.directives',
  'MyApp.controllers'
])
.config(function($stateProvider, $urlRouterProvider) {
  var resolve = {
    auth: function($q, $timeout, Auth, User) {
      var defer = $q.defer();
      var state = this;

      Auth.getCurrentUser().then(function() {
        User.loadCurrentUser().then(function() {
          if (state.name === 'change-password') {
            defer.resolve();
          } else {
            if (User.hasChangedPassword()) {
              defer.resolve();
            } else {
              defer.reject('change-password');
            }
          }
        });
      }, function() {
        $timeout(function() { // See: http://stackoverflow.com/q/24945731/247243
          defer.reject('login');
        }, 250);
      });

      return defer.promise;
    }
  };

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'sidemenu/sidemenu.html',
      controller: 'SideMenuCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    })
    .state('reset-password', {
      url: '/reset-password',
      templateUrl: 'reset-password/reset-password.html',
      controller: 'ResetPasswordCtrl'
    })
    .state('change-password', {
      url: '/change-password',
      templateUrl: 'change-password/change-password.html',
      controller: 'ChangePasswordCtrl',
      resolve: resolve
    })
    .state('app.dashboard', {
      url: '/dashboard', 
      views: {
        menuContent: {
          templateUrl: 'dashboard/dashboard.html',
          controller: 'DashboardCtrl',
          resolve: resolve
        }
      }
    });

  $urlRouterProvider.otherwise('/app/dashboard');
})
.run(function($rootScope, $state, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory 
    // bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $state.go(error);
    });
  });
})
.constant('FIREBASE_ROOT', 'https://myapp.firebaseio.com');

angular.module('MyApp.services', []);
angular.module('MyApp.directives', []);
angular.module('MyApp.controllers', []);
