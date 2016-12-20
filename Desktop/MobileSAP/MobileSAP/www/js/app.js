// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controller', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  //Assign the particular html pages to their respective controllers
    .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('BinToBin', {
    url: '/',
    templateUrl: 'templates/BinToBin.html',
    controller: 'BinCtrl'
  })

  .state('Details', {
    url: '/details',
    templateUrl: 'templates/GetBinDetails.html',
    controller: 'DetailsCtrl'
  })

  .state('ResponseList', {
    url: '/list',
    templateUrl: 'templates/ResponseList.html',
    controller: 'ListInCtrl'
  })

  .state('Success', {
    url: '/success',
    templateUrl: 'templates/Success.html',
    controller: 'successCtrl'
  })
  $urlRouterProvider.otherwise('/intro');
});
