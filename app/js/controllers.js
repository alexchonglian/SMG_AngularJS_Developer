'use strict';

/* Controllers */

var SMG = angular.module('SMGDevApp.controllers', ['ngCookies', 'ngSanitize']);


SMG.controller('LoginCtrl', ['$scope','$http','$location','$window','$cookieStore',
  function($scope, $http, $location, $window, $cookieStore) {
    $scope.submitLogin = function()
  	{
  		$http({
  			method: 'GET',
  			url: "http://2-dot-smg-server.appspot.com/developers/"+$scope.devId+"?password="+$scope.password
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
          $cookieStore.put("password", $scope.password);
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
				url: "http://2-dot-smg-server.appspot.com/developers/",
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
              url: "http://2-dot-smg-server.appspot.com/developers/"+returnVal.developerId+"?password="+jsonData.password
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
                console.log(returnVal2);

                $window.alert("Login Successful!");

                $cookieStore.put("email", returnVal2.email);
                $cookieStore.put("password", jsonData.password);
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

SMG.controller('MyGamesCtrl', ['$scope','$http','$window','$cookieStore','$route',
  function ($scope,  $http,  $window,  $cookieStore, $route) {

    $scope.submitformOpen = false;
    $scope.editformOpen = false;
    $scope.SSpopup = false;
    $scope.deleteGamepopup = false;

    $scope.SSs = [];

    var currentGame;

    $scope.showFormForNewGame = function() {
      $scope.submitformOpen = !$scope.submitformOpen;
      $scope.editformOpen = false;
    }

    $scope.closeAllForms =function() {
      $scope.submitformOpen = false;
      $scope.editformOpen = false;
    }

    $scope.addScreenShot = function() {
      $scope.closeAllForms();
      $scope.SSpopup = true;
    }

    $scope.editAddScreenShot = function() {
      $scope.closeAllForms;
      $scope.editSSpopup = true;
    }

    $scope.cancelSS = function() {
      $scope.SSpopup = false;
      $scope.submitformOpen = true;
      $scope.screenShot = "";
    }
    
    $scope.editCancelSS = function() {
      $scope.editSSpopup = false;
      $scope.editformOpen = true;
      $scope.editScreenShot = "";
    }

    $scope.addSS = function() {
      $scope.SSs.push($scope.screenShot);
      $scope.cancelSS();
    }

    $scope.editAddSS = function() {
      $scope.editSSs.push($scope.editScreenShot);
      $scope.editCancelSS();
    }

    $scope.clearSS = function (index) {
      console.log(index);
      console.log($scope.SSs);
      $scope.SSs.splice(index, 1);
      console.log($scope.SSs);
    }

    $scope.editClearSS = function (index) {
      console.log(index);
      console.log($scope.editSSs);
      $scope.editSSs.splice(index, 1);
      console.log($scope.editSSs);
    }

    $scope.deleteGame = function () {
      $scope.closeAllForms();
      $scope.deleteGamepopup = true;
    }

    $scope.yesDeleteGame = function() {
      $http({
        method: 'DELETE',
        url: "http://2-dot-smg-server.appspot.com/games/" + currentGame.gameId + "?developerId=" + $cookieStore.get('devId')
                                                          + "&accessSignature=" + $cookieStore.get('accessSignature'),
        dataType: 'json', 
        headers: { 'Content-Type': 'application/json' }
      }).
      success(function(returnVal) {
        if(returnVal.error == "WRONG_ACCESS_SIGNATURE")
        {
          $window.alert("Hmm. There seems to be an issue with your stored info. Game not deleted, please log out and back in.");
        }
        else if(returnVal.error == "WRONG_DEVELOPER_ID")
        {
          $window.alert("Cannot delete, wrong developer ID");
        }
        else if(returnVal.success == "DELETED_GAME")
        {
          $window.alert('Game Deleted Successfully!');
          console.log(returnVal);
          $route.reload();
        }
      }).
      error(function(err) {
        $window.alert('You fail!');

      })
    }

    $scope.noDeleteGame = function () {
      $scope.deleteGamepopup = false;
      $scope.editformOpen = true;
    }


    $scope.editGame = function (index) {
      $scope.closeAllForms();
      $scope.editformOpen = true;
      currentGame = $scope.games[index];
      console.log(JSON.stringify(currentGame));
      console.log(currentGame);

      $scope.editGameName = currentGame.gameName;
      $scope.editDescription = currentGame.description;
      $scope.editUrl = currentGame.url;
      $scope.editWidth = currentGame.width;
      $scope.editHeight = currentGame.height;
      $scope.editHasTokens = currentGame.hasTokens;

      if(currentGame.pics != {} && currentGame.pics != undefined)
      {
        if(currentGame.pics.icon != "" && currentGame.pics.icon != undefined)
          $scope.editInfo = currentGame.pics.icon;
        if(currentGame.pics.screenshots != [] && currentGame.pics.screenshots != undefined)
          $scope.editSSs = currentGame.pics.screenshots;
      }
      
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
        'url':$scope.url
      }

      var pics = {};

      if($scope.hasTokens)
        gameInfo.hasTokens = 'true';
      if($scope.icon != "" && $scope.icon != undefined)
        pics.icon = $scope.icon;
      if($scope.SSs != [] && $scope.SSs != undefined)
      {
        pics.screenshots = [];
        for(var i = 0; i < $scope.SSs.length; i++)
          pics.screenshots.push($scope.SSs[i]);
      }

      console.log(pics);
      if(pics != {})
        gameInfo.pics = pics;

      console.log(gameInfo);

      $http({
        method: 'POST',
        url: "http://2-dot-smg-server.appspot.com/games",
        data: JSON.stringify(gameInfo), 
        dataType: 'json', 
        headers: { 'Content-Type': 'application/json' }
      }).
      success(function(returnVal) {
        if(returnVal.error == "WRONG_ACCESS_SIGNATURE")
        {
          $window.alert("Hmm. There seems to be an issue with your stored info. Game not created, please log out and back in.");
        }
        else if(returnVal.error == "GAME_EXISTS")
        {
          $window.alert("Cannot create, game already exists.");
        }
        else if(returnVal.error == "MISSING_INFO")
        {
          $window.alert("Cannot create, missing some mandatory fields.");
        }
        else
        {
          $window.alert('Game Created Successfully!');
          console.log(returnVal.gameId);
          $route.reload();
        }
      }).
      error(function(err) {
        $window.alert('You fail!');

      })
    }

    $scope.updateGame = function() {
      var devId = $cookieStore.get('devId')
      var access = $cookieStore.get("accessSignature")

      var gameInfo = {
        'developerId':$cookieStore.get('devId'),
        'accessSignature':$cookieStore.get('accessSignature'),
        'description':$scope.editDescription,
        'width':$scope.editWidth,
        'height':$scope.editHeight,
        'gameName':$scope.editGameName,
        'url':$scope.editUrl
      }

      var pics = {}

      if($scope.editHasTokens)
        gameInfo.hasTokens = 'true';
      if($scope.editIcon != "" && $scope.editIcon != undefined)
        pics.icon = $scope.editIcon;
      if($scope.editSSs != [] && $scope.editSSs != undefined)
      {
        pics.screenshots = [];
        for(var i = 0; i < $scope.editSSs.length; i++)
          pics.screenshots.push($scope.editSSs[i]);
      }

      console.log(pics);

      if(pics != {})
        gameInfo.pics = pics;

      console.log(gameInfo);

      $http({
        method: 'PUT',
        url: "http://2-dot-smg-server.appspot.com/games/" + currentGame.gameId,
        data: JSON.stringify(gameInfo), 
        dataType: 'json', 
        headers: { 'Content-Type': 'application/json' }
      }).
      success(function(returnVal) {
        if(returnVal.error == "WRONG_ACCESS_SIGNATURE")
        {
          $window.alert("Hmm. There seems to be an issue with your stored info. Game not created, please log out and back in.");
        }
        else if(returnVal.error == "GAME_EXISTS")
        {
          $window.alert("Cannot create, game already exists.");
        }
        else if(returnVal.error == "MISSING_INFO")
        {
          $window.alert("Cannot create, missing some mandatory fields.");
        }
        else if(returnVal.error == "WRONG_DEVELOPER_ID")
        {
          $window.alert("Cannot create, wrong developer ID somehow.");
        }
        else
        {
          $window.alert('Game Updated Successfully!');
          $route.reload();
        }
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
    success(function(returnVal) {
      if(returnVal.error == "WRONG_DEVELOPER_ID")
      {
        $window.alert("Hmm. There seems to be an issue with your stored info. Please log out and back in.");
      }
      else if(returnVal.error == "WRONG_ACCESS_SIGNATURE")
      {
        $window.alert("Hmm. There seems to be an issue with your stored info. Please log out and back in.");
      }
      else
      {
        console.log(returnVal);
        $scope.games = returnVal;
      }
    }).
    error(function(err) {
      $console.log("Failed to get Game Information");
    })

}]);




SMG.controller('ConsoleCtrl', ['$scope',function($scope) {
}]);

SMG.controller('GetStartedCtrl', ['$scope',function($scope) {
}]);

SMG.controller('FAQCtrl', ['$scope',function($scope) {
}]);

SMG.controller('AccountCtrl', ['$scope','$cookieStore','$sce','$window','$http','$location',
  function($scope, $cookieStore, $sce, $window, $http, $location) {
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

  $scope.accountShow = true;
  $scope.deleteDeveloperPopup = false;

  $scope.deleteDeveloper = function () {
    $scope.accountShow = false;
    $scope.deleteDeveloperPopup = true;
  }

  $scope.yesDeleteAccount = function () {
    $http({
      method: 'DELETE',
      url: "http://2-dot-smg-server.appspot.com/developers/" + $cookieStore.get('devId') + "?accessSignature=" + $cookieStore.get('accessSignature'),
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
          $window.alert("Delete Developer failed - Access Signature incorrect!");
        }
        else if(returnVal.error == "WRONG_DEVELOPER_ID")
        {
          $window.alert("Delete Developer failed - Developer ID not found");
        }
      }
      else if(returnVal.success)
      {
        $cookieStore.remove("email");
        $cookieStore.remove("password");
        $cookieStore.remove("firstName");
        $cookieStore.remove("lastName");
        $cookieStore.remove("middleName");
        $cookieStore.remove("nickname");
        $cookieStore.remove("accessSignature");
        $cookieStore.remove("devId");

        $window.alert("Account deleted successfully!");

        var fullLoc = $location.url();
        var loc = fullLoc.indexOf("loggedin.html");
        $window.location.href = fullLoc.substring(0,loc) + 'index.html';
      }
      }).
      error(function(returnVal)
      {
        console.log("DELETE DEVELOPER CALL FAILED");
      });

  }

  $scope.noDeleteAccount = function () {
    $scope.deleteDeveloperPopup = false;
    $scope.accountShow = true;
  }
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
      url: "http://2-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId"),
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
          url: "http://2-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId")+"?accessSignature="+$cookieStore.get("accessSignature")
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
            url: "http://2-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId"),
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

SMG.controller("DashCtrl",['$routeParams','$http','$scope',
  function($routeParams, $http, $scope){
    this.$routeParams = $routeParams;

    $scope.retrieveGameStat = function() {
      $http({
        method: 'GET',
        url: "http://2-dot-smg-server.appspot.com/gameinfo/stats?gameId="+$routeParams.gameId,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json' }
      }).success(function(returnVal) {
        console.log(returnVal);
      }).error(function(returnVal) {
        console.log(returnVal);
      });

    }

    $http({
            method: 'GET',
            url: "http://2-dot-smg-server.appspot.com/gameinfo/stats?gameId="+$routeParams.gameId,
            dataType: 'json'
    }).success(function(returnVal)
          {
            if(returnVal.error == "WRONG_GAME_ID")
            {
              $window.alert("Invalid Game ID ! Naughty uh ?");
            }
            else
            {
              console.log("return val gameId");
              console.log($routeParams.gameId);
              console.log(returnVal);
            }
         }).error(function(returnVal)
            {
              console.log("Game Info Retrieval failed");
            }); 

      var gameStats = {
            "highScore":{
              "playerId":"979887675876",
              "score":98
            },
            "rating":3.5965,
            "currentGames":[
                {
                  "players":[{
                              "firstName":"Bob",
                              "nickname":"Ninja"
                            },{
                              "firstName":"Jane",
                              "nickname":"Ninja Reborn"
                            }]
                },
                {
                  "players":[{
                              "firstName":"Jeremy",
                              "nickname":"King of Ninja"
                            },{
                              "firstName":"John",
                              "nickname":"Crazy Banana"
                            }]

                }
            ],
            "finishedGames": [
              {
                "players": [
                        {
                           "firstName": "Bob",
                           "nickname": "Ninja",
                           "score": 43543, //int
                           "tokens": 2394384 // (for games that have tokens)
                        },
                        {
                           "firstName": "Jane",
                           "nickname": "Ninja",
                           "score": 9845, //int,
                           "tokens": 39843 //int  // (for games that have tokens)
                        }
                      ]
              },
              {
                "players":[
                            {
                               "firstName": "Bobby",
                               "nickname": "Ninja Baby",
                               "score": 9080, //int
                               "tokens": 978098 // (for games that have tokens)
                            },
                            {
                               "firstName": "Jason",
                               "nickname": "Ninja Handson",
                               "score": 988786, //int,
                               "tokens": 998786 //int  // (for games that have tokens)
                            }
                          ] 
              }]
        };
        console.log("game Stats");
        console.log(gameStats);
        $scope.gameStats = gameStats;
        console.log($scope);
}]); 

