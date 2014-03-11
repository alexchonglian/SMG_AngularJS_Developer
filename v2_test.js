// please make sure the following entries stored in DB before running the test
//
// var existedEmail = "alexchonglian@gmail.com";
// var correctPassword = "correctPassword"


var assert = require('assert');
var request = require('request');
var baseUrl = "http://game-3627-platform.com";  //just a temporary one will change later to our domain

var existedEmail = "alexchonglian@gmail.com";
var nonExistedEmail = "aaaaa@aaaa.aaa";

var correctPassword = "correctPassword"
var incorrectPassword = "incorrectPassword"

var validNewPassword = "ABC123456";
var unmatchedPassword = "654321CBA";
var invalidNewPassword = "1";


describe("Reset Password",function(){

	it("Should be OK to get reset-password page",function(done){
		request.get({url:baseUrl+"/developer/resetpassword"},function(e,r,body){
			assert.equal(r.statusCode,200);
			done();
		});
	});


	it("Should reject NonExistedEmail to modify password",function(done){
		request.post({url:baseUrl+"/developer/resetpassword",
			form:{
				email:nonExistedEmail,
				password:correctPassword, 
				newpw1: validNewPassword,
				newpw2: validNewPassword,
			}},function(e,r,body){
			assert.equal(body,{type:"resetpassword",status:"failure",msg:"invalid email"});
			done();
		});
	});

	it("Should reject existedEmail with wrong old password to modify password",function(done){
		request.post({url:baseUrl+"/developer/resetpassword",
			form:{
				email:existedEmail,
				password:incorrectPassword, 
				newpw1: validNewPassword,
				newpw2: validNewPassword,
			}},function(e,r,body){
			assert.equal(body,{type:"resetpassword",status:"failure",msg:"wrong password"});
			done();
		});
	});

	it("Should reject unmatchedNewPassword",function(done){
		request.post({url:baseUrl+"/developer/resetpassword",
			form:{
				email:existedEmail,
				password:correctPassword, 
				newpw1: validNewPassword,
				newpw2: unmatchedPassword,
			}},function(e,r,body){
			assert.equal(body,{type:"resetpassword",status:"failure",msg:"unmatched password"});
			done();
		});
	});

	it("Should reject invalid new password (to short) to modify password",function(done){
		request.post({url:baseUrl+"/developer/resetpassword",
			form:{
				email:existedEmail,
				password:correctPassword, 
				newpw1: invalidNewPassword,
				newpw2: invalidNewPassword,
			}},function(e,r,body){
			assert.equal(body,{type:"resetpassword",status:"failure",msg:"invalid new password"});
			done();
		});
	});

	it("Should accept existedEmail + correctPassword + matched/validNewPassword to modify password",function(done){
		request.post({url:baseUrl+"/developer/resetpassword",
			form:{
				email:existedEmail,
				password:correctPassword, 
				newpw1: invalidNewPassword,
				newpw2: invalidNewPassword,
			}},function(e,r,body){
			assert.equal(body,{type:"resetpassword",status:"success",msg:"reset password success"});
			done();
		});
	});
});


// If developer forgot password 
describe("Forget Password",function(){

	it("Should return success for good tokens",function(done){
		request.get({url:baseUrl+"/verification",qs:{time:new Date(),uid:12}},function(e,r,body){
			console.log(r.statusCode);
			assert.equal(r.statusCode,200);
			done();
		})
	});

	it("Should deny request for bad tokens (clearly hacker attempt)",function(done){
		request.get({url:baseUrl+"/verification",qs:{time:new Date(),uid:-1}},function(e,r,body){
			assert.equal(r.statusCode,403);
			done();
		})
	});

	var d = new Date();
	var d2 = new Date();

	d2.setHours(d.getHours() - 5); // five hours ago 

	it("Should fail with bad time token ",function(done){  // hacker change the time token
		request.get({url:baseUrl+"/verification",qs:{time:d2,uid:12}},function(e,r,body){
			assert.equal(r.statusCode,403);
			done();
		})
	});
});



// Game Submission

var invalidGameURL = "appspot.com"
var validGameURL = "alexchonnglian.appspot.com"

var invalidHeight = 0;
var validHeight = 400;
var invalidWidth = 0;
var validWidth = 400;

var invalidNumPlayers = 0;
var validNumPlayers = 3;

var invalidIsTurnBased = "invalid";
var validIsTurnBased  = true;
var invalidTurnTime = 5; // must be greater than 10;
var validTurnTime = null; // if null then no time limit

var invalidHasPassAndPlay = 5; // if null then false. only {null, false, true is valid}
var validHasPassAndPlay = null;

var invalidScreenShots = null;
var validScreenShots = 0; // TODO figure out what is valid

var invalidGameDescription = "GameDescription"
var validGameDescription = "GameDescriptionGameDescriptionGameDescriptionGameDescriptionGameDescriptionGameDescription"



describe("Game Submission Test",function(){ 

	it("Should be OK to get game submission page",function(done){
		request.get({url:baseUrl+"/developer/gamesubmission"},function(e,r,body){
			assert.equal(r.statusCode,200);
			done();
		});
	});

	it("Should Accept valid game",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL,
				height: validHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"success",msg:"submitted"});
			done();
		});
	});

	it("Should Reject invalidGameURL",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, // <= here goes wrong
				height: invalidHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid game URL"});
			done();
		});
	});

	it("Should Reject invalidHeight",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: invalidHeight, // <= here goes wrong
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid height"});
			done();
		});
	});

	it("Should Reject invalidWidth",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: validHeight,
				width: invalidWidth, // <= here goes wrong
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid width"});
			done();
		});
	});

	it("Should Reject invalidNumPlayers",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL,
				height: validHeight,
				width: validWidth,
				numplayers: invalidNumPlayers, // <= here goes wrong
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid numPlayers"});
			done();
		});
	});

	it("Should Reject invalidIsTurnBased",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: validHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: invalidIsTurnBased, // <= here goes wrong
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid isTurnBased"});
			done();
		});
	});

	it("Should Reject invalidTurnTime",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: validHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: invalidTurnTime, // <= here goes wrong
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid turnTime"});
			done();
		});
	});

	it("Should Reject invalidHasPassAndPlay",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: validHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: invalidHasPassAndPlay, // <= here goes wrong
				screenshot: validScreenShots,
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid hasPassAndPlay"});
			done();
		});
	});

	it("Should Reject invalidScreenShots",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: validHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: invalidScreenShots, // <= here goes wrong
				gamedescription: validGameDescription
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid screen shot"});
			done();
		});
	});

	it("Should Reject invalidGameDescription",function(done){
		request.post({url:baseUrl+"/developer/gamesubmission",
			form:{
				gameurl: validGameURL, 
				height: validHeight,
				width: validWidth,
				numplayers: validNumPlayers,
				isturnbased: validIsTurnBased,
				turntime: validTurnTime,
				haspassandplay: validHasPassAndPlay,
				screenshot: validScreenShots, 
				gamedescription: invalidGameDescription // <= here goes wrong
			}},function(e,r,body){
			assert.equal(body,{type:"gamesubmission",status:"failure",msg:"invalid game description"});
			done();
		});
	});

}); 


