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
    auth: function(Auth, User) {
      return Auth.getCurrentUser().then(User.loadCurrentUser);
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
          controller: 'DashboardCtrl'//,
          //resolve: resolve // What's wrong with this??
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

    $rootScope.$on('$stateChangeError', function() {
      $state.go('login');
    });
  });
})
.constant('FIREBASE_ROOT', 'https://myapp.firebaseio.com');

angular.module('MyApp.services', []);
angular.module('MyApp.directives', []);
angular.module('MyApp.controllers', []);
