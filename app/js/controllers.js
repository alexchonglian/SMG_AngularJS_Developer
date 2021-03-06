'use strict';

/* Controllers */

var SMG = angular.module('SMGDevApp.controllers', ['ngCookies', 'ngSanitize', 'pascalprecht.translate']);

SMG.controller('cookieCtrl', ['$scope', '$cookieStore', '$location',
  function($scope, $cookieStore, $location) {
    var loc = $location.url();
    var actualLoc = loc.indexOf("?") + 1;
    var query = loc.substring(actualLoc);
    var vars = query.split("&");

    for (var i=0;i<vars.length;i++)
    {
      var pair = vars[i].split("=");
        // If first entry with this name
      if (pair[0] === "developerId")
      {
        var devIdString = "devId=" + pair[1];
        $cookieStore.put("devId", pair[1]);
      }
      else if (pair[0] === "accessSignature")
      {
        var accessSignatureString = "accessSignature=" + pair[1];
        $cookieStore.put("accessSignature", pair[1]);
      }
    }

  }]);


SMG.controller('LoginCtrl', ['$scope','$http','$location','$window','$cookieStore',
  function($scope, $http, $location, $window, $cookieStore) {
    $scope.submitLogin = function()
  	{
  		$http({
  			method: 'GET',
  			url: "http://4-dot-smg-server.appspot.com/developers/"+$scope.devId+"?password="+$scope.password
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
          $window.alert("Login Successful!");

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
      if($scope.imageURL != "")
      {
        jsonData.imageURL = $scope.imageURL;
      }

			$http({
				method: 'POST',
				url: "http://4-dot-smg-server.appspot.com/developers/",
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
              url: "http://4-dot-smg-server.appspot.com/developers/"+returnVal.developerId+"?password="+jsonData.password
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

                $window.alert("Login Successful!");
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
      $scope.closeAllForms();
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
        url: "http://4-dot-smg-server.appspot.com/games/" + currentGame.gameId + "?developerId=" + $cookieStore.get('devId')
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
      console.log(currentGame);

      $scope.editGameName = currentGame.gameName;
      $scope.editDescription = currentGame.description;
      $scope.editUrl = currentGame.url;
      $scope.editHasTokens = currentGame.hasTokens;

      var pics = currentGame.pics;

      console.log(pics);

      if(pics != {} && pics != undefined)
      {
        if(pics.icon != "" && pics.icon != undefined)
          $scope.editIcon = pics.icon;
        if(currentGame.pics.screenshots != [] && currentGame.pics.screenshots != undefined)
          $scope.editSSs = pics.screenshots;
      }
      
    }

    $scope.submitGame = function() {
      var devId = $cookieStore.get('devId')
      var access = $cookieStore.get("accessSignature")

      var gameInfo = {
        'developerId':$cookieStore.get('devId'),
        'accessSignature':$cookieStore.get('accessSignature'),
        'description':$scope.description,
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
        url: "http://4-dot-smg-server.appspot.com/games",
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
        url: "http://4-dot-smg-server.appspot.com/games/" + currentGame.gameId,
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
      url: "http://4-dot-smg-server.appspot.com/gameinfo/all?developerId="+$cookieStore.get('devId')+"&accessSignature="+$cookieStore.get('accessSignature'),
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

    var devId = $cookieStore.get('devId');
    var accessSignature = $cookieStore.get('accessSignature');

    $http({
      method: 'GET',
      url: "http://4-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get('devId')+"?accessSignature="+$cookieStore.get('accessSignature'),
      dataType: 'json', 
      headers: { 'Content-Type': 'application/json' }
    }).
    success(function(returnVal) {
      if(returnVal.error == "WRONG_DEVELOPER_ID")
      {
        $window.alert("Hmm. There seems to be an issue with your stored info. Please log out and back in.");
      }
      else
      {
        $scope.email = returnVal.email;
        $scope.devId = $cookieStore.get('devId');
        $scope.firstName = returnVal.firstName;
        $scope.middleName = returnVal.middleName;
        $scope.lastName = returnVal.lastName;
        $scope.nickname = returnVal.nickname;
        $scope.imageURL = returnVal.imageURL;
      }
    }).
    error(function(err) {
      $console.log("Failed to get Game Information");
    })

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
      url: "http://4-dot-smg-server.appspot.com/developers/" + $cookieStore.get('devId') + "?accessSignature=" + $cookieStore.get('accessSignature'),
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
  
  $http({
      method: 'GET',
      url: "http://4-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get('devId')+"?accessSignature="+$cookieStore.get('accessSignature'),
      dataType: 'json', 
      headers: { 'Content-Type': 'application/json' }
    }).
    success(function(returnVal) {
      if(returnVal.error == "WRONG_DEVELOPER_ID")
      {
        $window.alert("Hmm. There seems to be an issue with your stored info. Please log out and back in.");
      }
      else
      {
        $scope.email = returnVal.email;
        $scope.devId = $cookieStore.get('devId');
        $scope.firstName = returnVal.firstName;
        $scope.middleName = returnVal.middleName;
        $scope.lastName = returnVal.lastName;
        $scope.nickname = returnVal.nickname;
        $scope.imageURL = returnVal.imageURL;
      }
    }).
    error(function(err) {
      $console.log("Failed to get Game Information");
    })


  $scope.updateDetails = function() {
        var jsonData =
        {
          "accessSignature": $cookieStore.get("accessSignature")
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
        if($scope.imageURL != "")
        {
          jsonData.imageURL = $scope.imageURL;
        }

    $http({
      method: 'PUT',
      url: "http://4-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId"),
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
          $window.alert("Update details failed - Access Signature incorrect!");
        }
        else if(returnVal.error == "WRONG_DEVELOPER_ID")
        {
          $window.alert("Update details failed - Developer ID not found");
        }
      }
      else
      {
        $window.alert("Details updated successfully!");
        $window.location.href = "#/account";
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

        if($scope.new != $scope.repeat)
        {
          window.alert("New passwords do not match");
        }
        else
        {
          $http({
            method: 'PUT',
            url: "http://4-dot-smg-server.appspot.com/developerinfo/"+$cookieStore.get("devId"),
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
        url: "http://4-dot-smg-server.appspot.com/gameinfo/stats?gameId="+$routeParams.gameId,
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
            url: "http://4-dot-smg-server.appspot.com/gameinfo/stats?gameId="+$routeParams.gameId,
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

