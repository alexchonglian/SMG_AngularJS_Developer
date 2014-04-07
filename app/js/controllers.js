'use strict';
//6210258569527296 developer id

/* Controllers */

var SMG = angular.module('SMGDevApp.controllers', ['ngCookies', 'ngSanitize']);


SMG.controller('LoginCtrl', ['$scope','$http','$location','$window','$cookieStore',
  function($scope, $http, $location, $window, $cookieStore) {
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
          if(returnVal.firstName != undefined)
            $cookieStore.put("firstName", returnVal.firstName);
          if(returnVal.lastName != undefined)
            $cookieStore.put("lastName", returnVal.lastName);
          if(returnVal.middleName != undefined)
            $cookieStore.put("middleName", returnVal.middleName);
          if(returnVal.nickname != undefined)
            $cookieStore.put("nickname", returnVal.nickname);
          $cookieStore.put("accessSignature", returnVal.accessSignature);
          $cookieStore.put("devId", $scope.devId);

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
              success(function(returnVal2)
              {
                if(returnVal2.error)
                {
                  console.log("Error: " + returnVal2.error);
                  if(returnVal2.error == "WRONG_PASSWORD")
                  {
                    $window.alert("Login failed - Password incorrect!");
                  }
                  else if(returnVal2.error == "WRONG_DEVELOPER_ID")
                  {
                    $window.alert("Login failed - Developer ID not found");
                  }
                }
                else
                {
                  console.log("Email: " + returnVal2.email);
                  console.log("Password: " + returnVal2.password);
                  console.log($location.url());
                  console.log(returnVal2);

                  $window.alert("Login Successful!");

                  $cookieStore.put("email", returnVal2.email);
                  $cookieStore.put("password", returnVal2.password);
                  if(returnVal2.firstName != undefined)
                    $cookieStore.put("firstName", returnVal2.firstName);
                  if(returnVal2.lastName != undefined)
                    $cookieStore.put("lastName", returnVal2.lastName);
                  if(returnVal2.middleName != undefined)
                    $cookieStore.put("middleName", returnVal2.middleName);
                  if(returnVal2.nickname != undefined)
                    $cookieStore.put("nickname", returnVal2.nickname);
                  $cookieStore.put("accessSignature", returnVal2.accessSignature);
                  $cookieStore.put("devId", returnVal.developerId);

                  var fullLoc = $location.url();
                  var loc = fullLoc.indexOf("index.html");
                  $window.location.href = fullLoc.substring(0,loc) + 'loggedin.html';
                }
              }).
              error(function(returnVal2)
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


SMG.controller('MyGamesCtrl', 
  ['$scope','$http','$window','$cookieStore','$route', function 
  ($scope,  $http,  $window,  $cookieStore, $route) {

    $scope.submitformOpen = false;
    $scope.editFormOpen = false;
    var gameList = new Array();

    $scope.showFormForNewGame = function() {
      $scope.submitformOpen = !$scope.submitformOpen;
      $scope.editFormOpen = false;
    }

    $scope.cancelSubmitSubmission =function() {
      $scope.submitformOpen = false;
      $scope.editFormOpen = false;
    }


    $scope.editGame = function (index) {
      $scope.cancelSubmitSubmission();
      $scope.editformOpen = true;
      var currentGame = $scope.games[index];
      $window.alert(currentGame);
      console.log(currentGame);

      /*var games = [
      {'name':'Cheat Game','url':'http://cheatgame.appspot.com','stat': 123, 
      'description':'Cheat Game', 'width':'800', 'height':'800', 'hasTokens':false, 'pic':[]},
      
      {'name':'Texas Hodem','url':'http://texashodem.appspot.com','stat': 999,
      'description':'Texas Hodem', 'width':'800', 'height':'800', 'hasTokens':false, 'pic':[]},
      
      {'name':'Counter Strike','url':'http://counterstrike.appspot.com','stat': 321,
      'description':'Counter Strike', 'width':'800', 'height':'800', 'hasTokens':false, 'pic':[]}
      ]*/

      $scope.editGameName = currentGame.name;
      $scope.editDescription = currentGame.description;
      $scope.editUrl = currentGame.url;
      $scope.editWidth = currentGame.width;
      $scope.editHeight = currentGame.height;
      $scope.editHasTokens = currentGame.hasTokens;
      
    }

    $scope.submitGame = function() {
      var devId = $cookieStore.get('devId')
      var access = $cookieStore.get("accessSignature")

      var gameInfo = {
        'developerId':$cookieStore.get('devId'),
        'accessSignature':$cookieStore.get('accessSignature'),
        'description':$scope.description,
        'width':$scope.width,
        'height':$scope.height,
        'gameName':$scope.gameName,
        'url':$scope.url,
        'hasTokens':$scope.hasTokens
      }
      //frontend validation is ignore for the time being

      $http({
        method: 'POST',
        url: "http://2-dot-smg-server.appspot.com/games",
        data: JSON.stringify(gameInfo), 
        dataType: 'json', 
        headers: { 'Content-Type': 'application/json' }
      }).
      success(function(response) {
        $window.alert('Game Created Successfully!');
        console.log(response);
        $scope.formOpen = false;
        $route.reload();
      }).
      error(function(err) {
        $window.alert('You fail!');

      })
    }

      $http({
        method: 'GET',
        url: "http://2-dot-smg-server.appspot.com/gameinfo/all?developerId="+$cookieStore.get('devId')+"&accessSignature="+$cookieStore.get('accessSignature'),
        dataType: 'json', 
        headers: { 'Content-Type': 'application/json' }
      }).
      success(function(response) {
        /*for(i = 0; i < response.length(); i++)
        {
          currentGame = response[i];
          gameList[i] = {'name':currentGame.gameName,
                         'url' :currentGame.url,
                         'stat':000,
                         'description':currentGame.description,
                         'width':currentGame.width,
                         'height':currentGame.height,
                         'hasTokens':false,
                         'pic':[]};
        }*/
        $scope.games = response;
      }).
      error(function(err) {
        $console.log("Failed to get Game Information");
      })

    var games = [
    {'name':'Cheat Game','url':'http://cheatgame.appspot.com','stat': 123, 
    'description':'Cheat Game', 'width':'800', 'height':'800', 'hasTokens':false, 'pic':[]},
    
    {'name':'Texas Hodem','url':'http://texashodem.appspot.com','stat': 999,
    'description':'Texas Hodem', 'width':'800', 'height':'800', 'hasTokens':false, 'pic':[]},
    
    {'name':'Counter Strike','url':'http://counterstrike.appspot.com','stat': 321,
    'description':'Counter Strike', 'width':'800', 'height':'800', 'hasTokens':true, 'pic':[]}
    ]

    //$scope.games = games;
    //$scope.games = gameList;


}]);




SMG.controller('ConsoleCtrl', ['$scope',function($scope) {
}]);

SMG.controller('GetStartedCtrl', ['$scope',function($scope) {
}]);

SMG.controller('FAQCtrl', ['$scope',function($scope) {
}]);

SMG.controller('AccountCtrl', ['$scope','$cookieStore','$sce','$window',
  function($scope, $cookieStore, $sce, $window) {
  if($cookieStore.get('email') != undefined && $cookieStore.get('email') != null)
    $scope.email = $sce.trustAsHtml($cookieStore.get('email'));
  else
    $scope.email = "          ";
  if($cookieStore.get('devId') != undefined && $cookieStore.get('devId') != null)
    $scope.devId = $sce.trustAsHtml($cookieStore.get('devId'));
  else
    $scope.email = "          ";
  if($cookieStore.get('firstName') != undefined && $cookieStore.get('firstName') != null)
    $scope.firstName = $sce.trustAsHtml($cookieStore.get('firstName'));
  else
    $scope.firstName = "          ";
  if($cookieStore.get('middleName') != undefined && $cookieStore.get('middleName') != null)
    $scope.middleName = $sce.trustAsHtml($cookieStore.get('middleName'));
  else
    $scope.middleName = "          ";
  if($cookieStore.get('lastName') != undefined && $cookieStore.get('lastName') != null)
    $scope.lastName = $sce.trustAsHtml($cookieStore.get('lastName'));
  else
    $scope.lastName = "          ";
  if($cookieStore.get('nickname') != undefined && $cookieStore.get('nickname') != null)
    $scope.nickname = $sce.trustAsHtml($cookieStore.get('nickname'));
  else
    $scope.nickname = "          ";

  $scope.updateDetails = function () {
    $window.location.href = "#/updateDetails";
  };

  $scope.changePassword = function () {
    $window.location.href = "#/changePassword";
  };
}]);

SMG.controller('UpdateDetailsCtrl', ['$scope','$http','$window','$cookieStore',
  function($scope, $http, $window, $cookieStore) {
  if($cookieStore.get('firstName') != undefined && $cookieStore.get('firstName') != null)
    $scope.firstName = $cookieStore.get('firstName');
  if($cookieStore.get('middleName') != undefined && $cookieStore.get('middleName') != null)
    $scope.middleName = $cookieStore.get('middleName');
  if($cookieStore.get('lastName') != undefined && $cookieStore.get('lastName') != null)
    $scope.lastName = $cookieStore.get('lastName');
  if($cookieStore.get('nickname') != undefined && $cookieStore.get('nickname') != null)
    $scope.nickname = $cookieStore.get('nickname');


  $scope.updateDetails = function() {
        var jsonData =
        {
          "accessSignature": $cookieStore.get("accessSignature"),
          "password": $cookieStore.get("password")
        };

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

        console.log('JSON Struct accessSignature - ' + jsonData.accessSignature);
        console.log('JSON Struct password - ' + jsonData.password);
        console.log('JSON Struct firstName - ' + jsonData.firstName);
        console.log('JSON Struct middleName - ' + jsonData.middleName);
        console.log('JSON Struct lastName - ' + jsonData.lastName);
        console.log('JSON Struct nickname - ' + jsonData.nickname);

    $http({
      method: 'PUT',
      url: "http://2.smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId"),
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
        if(returnVal.error == "WRONG_ACCESS_SIGNATURE")
        {
          $window.alert("Login failed - Access Signature incorrect!");
        }
        else if(returnVal.error == "WRONG_DEVELOPER_ID")
        {
          $window.alert("Login failed - Developer ID not found");
        }
      }
      else
      {
        $http({
          method: 'GET',
          url: "http://2.smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId")+"?accessSignature="+$cookieStore.get("accessSignature")
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

            $cookieStore.remove("firstName");
            $cookieStore.remove("middleName");
            $cookieStore.remove("lastName");
            $cookieStore.remove("nickname");

            if(returnVal.firstName != undefined)
              $cookieStore.put("firstName", returnVal.firstName);
            if(returnVal.lastName != undefined)
              $cookieStore.put("lastName", returnVal.lastName);
            if(returnVal.middleName != undefined)
              $cookieStore.put("middleName", returnVal.middleName);
            if(returnVal.nickname != undefined)
              $cookieStore.put("nickname", returnVal.nickname);

            $window.alert("Details updated successfully!");
            $window.location.href = "#/account";
          }
        }).
        error(function(returnVal)
        {
          console.log("LOGIN DEVELOPER CALL FAILED");
        });
      }
    }).
    error(function(returnVal)
    {
      console.log("UPDATE DEVELOPER DETAILS CALL FAILED");
    });

  };
}]);

SMG.controller('ChangePasswordCtrl', ['$scope','$http','$window','$cookieStore',
  function($scope, $http, $window, $cookieStore) {

  $scope.changePassword = function() {
        var jsonData =
        {
          "accessSignature": $cookieStore.get("accessSignature"),
          "password": $scope.new
        };

        console.log('JSON Struct accessSignature - ' + jsonData.accessSignature);
        console.log('JSON Struct password - ' + jsonData.password);

        if($scope.old != $cookieStore.get("password"))
        {
          window.alert("Old password not correct!");
        }
        else if($scope.new != $scope.repeat)
        {
          window.alert("New passwords do not match");
        }
        else
        {
          $http({
            method: 'PUT',
            url: "http://2.smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId"),
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
              if(returnVal.error == "WRONG_ACCESS_SIGNATURE")
              {
                $window.alert("Login failed - Access Signature incorrect!");
              }
              else if(returnVal.error == "WRONG_DEVELOPER_ID")
              {
                $window.alert("Login failed - Developer ID not found");
              }
            }
            else
            {
              $cookieStore.put("password", $scope.new);

              $window.alert("Password changed successfully!");
              $window.location.href = "#/account";
            }
            }).
            error(function(returnVal)
            {
              console.log("UPDATE DEVELOPER DETAILS CALL FAILED");
            });
        }
  };
}]);

SMG.controller('LogoutCtrl', ['$scope','$location','$window','$cookieStore',
  function($scope, $location, $window, $cookieStore) {

  $scope.yes = function () {
  $cookieStore.remove("email");
  $cookieStore.remove("password");
  $cookieStore.remove("firstName");
  $cookieStore.remove("lastName");
  $cookieStore.remove("middleName");
  $cookieStore.remove("nickname");
  $cookieStore.remove("accessSignature");
  $cookieStore.remove("devId");

  $window.alert("Logout Successful!");

  var fullLoc = $location.url();
  var loc = fullLoc.indexOf("loggedin.html");
  $window.location.href = fullLoc.substring(0,loc) + 'index.html';
  };

  $scope.no = function () {
  var fullLoc = $location.url();
  var loc = fullLoc.indexOf("loggedin.html");
  $window.location.href = fullLoc.substring(0,loc) + 'loggedin.html';
  };

}]);

SMG.controller("DashCtrl",['$scope',function(){
        
}]);

