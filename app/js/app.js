'use strict';


// Declare app level module which depends on filters, and services
var devApp = angular.module('SMGDevApp', [
  'ngRoute',
  'ngAnimate',
  'ngCookies',
  'SMGDevApp.filters',
  'SMGDevApp.services',
  'SMGDevApp.directives',
  'SMGDevApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'});

  $routeProvider.when('/dash/:gameId', {templateUrl: 'partials/dash.html', controller: 'DashCtrl'});
  $routeProvider.when('/bugs', {templateUrl: 'partials/bugs.html', controller: 'BugsCtrl'});
  
  $routeProvider.when('/mygames', {templateUrl: 'partials/mygames.html', controller: 'MyGamesCtrl'});
  $routeProvider.when('/console', {templateUrl: 'partials/console.html', controller: 'ConsoleCtrl'});
  $routeProvider.when('/getstarted', {templateUrl: 'partials/getstarted.html', controller: 'GetStartedCtrl'});
  $routeProvider.when('/faq', {templateUrl: 'partials/faq.html', controller: 'FAQCtrl'});

  $routeProvider.when('/account', {templateUrl: 'partials/account.html', controller: 'AccountCtrl'});
  $routeProvider.when('/updateDetails', {templateUrl: 'partials/updateDetails.html', controller: 'UpdateDetailsCtrl'});
  $routeProvider.when('/changePassword', {templateUrl: 'partials/changePassword.html', controller: 'ChangePasswordCtrl'});
  $routeProvider.when('/logout', {templateUrl: 'partials/logout.html', controller: 'LogoutCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

