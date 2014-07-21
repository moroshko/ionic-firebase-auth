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
    'app.js',
    'auth/*.js',
    'user/*.js',
    'signup/*.js',
    'sidemenu/*.js'
  ]
};
