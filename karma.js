module.exports = {
  basePath: './www/',
  frameworks: ['jasmine'],
  browsers: ['Chrome'],
  singleRun: true,
  files: [
    'lib/ionic/js/ionic.bundle.js',
    'lib/firebase/firebase.js',
    'lib/firebase/angularfire.min.js',
    'lib/firebase/firebase-simple-login.js',
    '**/*.js'
  ],
  exclude: [
    'lib/ionic/**/*.min.js',
    'lib/ionic/js/angular/**/*.js',
    'lib/ionic/js/angular-ui/**/*.js',
    'lib/ionic/js/*.angular.js',
    'lib/ionic/js/ionic.js',
    'myapp.js'
  ]
};
