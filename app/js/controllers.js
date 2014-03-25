'use strict';

/* Controllers */

angular.module('dormCatApp.controllers', []).
  controller('LoginCtrl', [function() {

  }])
  .controller('SignupCtrl', [function() {

  }])
  .controller('InfoGameCtrl', ['$scope',function($scope) {
  	var games = [
  		{
  			'name':'alex',
  			'url':'http://www.google.com',
  			'stat': 123
  		}, 

  		{
  			'name':'bob',
  			'url':'http://www.google.com',
  			'stat': 999
  		}, 

  		{
  			'name':'chris',
  			'url':'http://www.google.com',
  			'stat': 321
  		}
  	]

  	$scope.games = games;

  }]);
