'use strict';


// Declare app level module which depends on filters, and services
angular.module('dormCatApp', [
  'ngRoute',
  'ngAnimate',
  'ngCookies',
  'dormCatApp.filters',
  'dormCatApp.services',
  'dormCatApp.directives',
  'dormCatApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'});
  $routeProvider.when('/dash', {templateUrl: 'partials/dash.html', controller: 'DashCtrl'});
  $routeProvider.when('/bugs', {templateUrl: 'partials/bugs.html', controller: 'BugsCtrl'});
  $routeProvider.when('/infogame', {templateUrl: 'partials/infogame.html', controller: 'InfoGameCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
