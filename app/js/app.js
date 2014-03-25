'use strict';


// Declare app level module which depends on filters, and services
angular.module('dormCatApp', [
  'ngRoute',
  'ngAnimate',
  'dormCatApp.filters',
  'dormCatApp.services',
  'dormCatApp.directives',
  'dormCatApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'});
  $routeProvider.when('/dash', {templateUrl: 'partials/dashboard.html', controller: 'DashCtrl'});
  $routeProvider.when('/bug', {templateUrl: 'partials/bugreport.html', controller: 'BugCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
