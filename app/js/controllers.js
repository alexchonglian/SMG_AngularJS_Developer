'use strict';

/* Controllers */

angular.module('dormCatApp.controllers', []).
  controller('LoginCtrl', ['$scope','$http','$location',function($scope, $http, $location) {
  		$scope.submitLogin = function()
  		{
  			$http({
  				method: 'GET',
  				url: "http://1.smg-server.appspot.com/developers/"+$scope.devId+"?password="+$scope.password
  				}).
  				success(function(returnVal)
  				{
  					if(returnVal.error)
  					{
  						console.log("Error: " + returnVal.error);
  					}
  					else
  					{
  						console.log("Email: " + returnVal.email);
  						console.log("Password: " + returnVal.password);
  					}
  				}).
  				error(function(returnVal)
  				{
  					console.log("LOGIN DEVELOPER CALL FAILED");
  				});
  		}
  	}])
  	.controller('SignupCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
	$scope.createDeveloper = function()
  		{
  			var jsonData = 
  			{
  				"email": $scope.email,
				"password": $scope.password
  			};
  			$http({
  				method: 'POST',
  				url: "http://1.smg-server.appspot.com/developers/",
  				data: JSON.stringify(jsonData),
  				dataType: 'json',
  				headers: {
  					'Content-Type': 'application/json'
  				}
  				}).
  				success(function(returnVal)
  				{
  					if(returnVal.error)
  					{
  						console.log("Error: " + returnVal.error);
  					}
  					else
  					{
  						console.log("Access Signature: " + returnVal.accessSignature);
  						console.log("Developer ID: " + returnVal.developerId);
  					}
  				}).
  				error(function(data, status, headers, config)
  				{
  					console.log("CREATE DEVELOPER CALL FAILED");
  				});
  		}
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
