'use strict';

/* Controllers */

var SMG = angular.module('dormCatApp.controllers', ['ngCookies']);
SMG.controller('LoginCtrl', ['$scope','$http','$location','$window','$cookieStore',
  function($scope, $http, $location, $window, $cookieStore) {$scope.submitLogin = function()
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
          if(returnVal.error == "WRONG_PASSWORD")
          {
            $window.alert("Login failed - Password incorrect!");
          }
          else if(returnVal.error == "WRONG_DEVELOPER_ID")
          {
            $window.alert("Login failed - Developer ID not found");
          }
  			}
  			else
  			{
  				console.log("Email: " + returnVal.email);
  				console.log("Password: " + returnVal.password);
          console.log($location.url());
          console.log(returnVal);

          $window.alert("Login Successful!");

          $cookieStore.put("email", returnVal.email);
          $cookieStore.put("password", returnVal.password);
          $cookieStore.put("firstName", returnVal.firstName);
          $cookieStore.put("lastName", returnVal.lastName);
          $cookieStore.put("middleName", returnVal.middleName);
          $cookieStore.put("nickname", returnVal.nickname);
          $cookieStore.put("accessSignature", returnVal.accessSignature);

          var fullLoc = $location.url();
          var loc = fullLoc.indexOf("index.html");
          $window.location.href = fullLoc.substring(0,loc) + 'loggedin.html';
  			}
  		}).
  		error(function(returnVal)
  		{
  			console.log("LOGIN DEVELOPER CALL FAILED");
  		});
  	}
  }]);
SMG.controller('SignupCtrl', ['$scope','$http','$location','$window','$cookieStore',
      function($scope, $http, $location, $window, $cookieStore) {
	$scope.createDeveloper = function()
  		{
        console.log('EMAIL - ' + $scope.email);
        console.log('PASSWORD - ' + $scope.password);
  			var jsonData =
  			{
  				"email": $scope.email
  			};

        if($scope.password != "")
        {
          jsonData.password = $scope.password;
        }
        if($scope.firstName != "")
        {
          jsonData.firstName = $scope.firstName;
        }
        if($scope.middleName != "")
        {
          jsonData.middleName = $scope.middleName;
        }
        if($scope.lastName != "")
        {
          jsonData.lastName = $scope.lastName;
        }
        if($scope.nickname != "")
        {
          jsonData.nickname = $scope.nickname;
        }

        console.log('JSON Struct email - ' + jsonData.email);
        console.log('JSON Struct password - ' + jsonData.password);
        console.log('JSON Struct firstName - ' + jsonData.firstName);
        console.log('JSON Struct middleName - ' + jsonData.middleName);
        console.log('JSON Struct lastName - ' + jsonData.lastName);
        console.log('JSON Struct nickname - ' + jsonData.nickname);

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
              if(returnVal.error == "EMAIL_EXISTS")
              {
                $window.alert("Sign up failed - Email already registered!");
              }
              else if(returnVal.error == "MISSING_INFO")
              {
                $window.alert("Sign up failed - Email or password not entered!");
              }
  					}
  					else
  					{
  						console.log("Access Signature: " + returnVal.accessSignature);
  						console.log("Developer ID: " + returnVal.developerId);
              $window.alert("Welcome New Developer! Your Dev ID is " + returnVal.developerId);

              $http({
                method: 'GET',
                url: "http://1.smg-server.appspot.com/developers/"+returnVal.developerId+"?password="+jsonData.password
                }).
              success(function(returnVal)
              {
                if(returnVal.error)
                {
                  console.log("Error: " + returnVal.error);
                  if(returnVal.error == "WRONG_PASSWORD")
                  {
                    $window.alert("Login failed - Password incorrect!");
                  }
                  else if(returnVal.error == "WRONG_DEVELOPER_ID")
                  {
                    $window.alert("Login failed - Developer ID not found");
                  }
                }
                else
                {
                  console.log("Email: " + returnVal.email);
                  console.log("Password: " + returnVal.password);
                  console.log($location.url());
                  console.log(returnVal);

                  $window.alert("Login Successful!");

                  $cookieStore.put("email", returnVal.email);
                  $cookieStore.put("password", returnVal.password);
                  $cookieStore.put("firstName", returnVal.firstName);
                  $cookieStore.put("lastName", returnVal.lastName);
                  $cookieStore.put("middleName", returnVal.middleName);
                  $cookieStore.put("nickname", returnVal.nickname);
                  $cookieStore.put("accessSignature", returnVal.accessSignature);

                  var fullLoc = $location.url();
                  var loc = fullLoc.indexOf("index.html");
                  $window.location.href = fullLoc.substring(0,loc) + 'loggedin.html';
                }
              }).
              error(function(returnVal)
              {
                console.log("LOGIN DEVELOPER CALL FAILED");
              });
  					}
  				}).
  				error(function(data, status, headers, config)
  				{
  					console.log("CREATE DEVELOPER CALL FAILED");
  				});
  		}
  	}]);


SMG.controller('MyGamesCtrl', ['$scope',function($scope) {
  var games = [
  {'name':'Cheat Game','url':'http://www.google.com','stat': 123},
  {'name':'Texas Hodem','url':'http://www.google.com','stat': 999}, 
  {'name':'Counter Strike','url':'http://www.google.com','stat': 321}]
  $scope.games = games;
}]);

SMG.controller('ConsoleCtrl', ['$scope',function($scope) {
}]);

SMG.controller('GetStartedCtrl', ['$scope',function($scope) {
}]);

SMG.controller('FAQCtrl', ['$scope',function($scope) {
}]);

SMG.controller('AccountCtrl', ['$scope',function($scope) {
}]);

SMG.controller('Logout', ['$scope',function($scope) {
}]);

SMG.controller('LogoutCtrl', ['$scope',function($scope) {
}]);

