var assert = require('assert');
var request = require('request');
var baseUrl = "http://game-3627-platform.com";  //just a temporary one will change later to our domain
var loggedInUser = "114";
var notLoggedInUser = "233";
var invalidUser = "999";
var gameOwnedByUser = "CandyLand";
var invalidGame = "NotAGame";
var gameNotOwnedByUser = "RussianRoulette";
var security = "security";
var memory = "memory";
var usage = "usage";
var features = "features";
var sqlquery = "sqlquery";
var validSQL = "SELECT * FROM 114CandyLandbugreport;";
var validSQLWrongUser = "SELECT * FROM 223RussianRoulettebugreport;";
var validSQLModifiesContent = "CREATE TABLE data (id INTEGER PRIMARY KEY , name TEXT);";
var invalidSQL = "err";

describe("Load Dashboard Test",function(){
	it("Getting dashboard page should succeed",function(done){
		request.post({url:baseUrl+"/developer/dashboard"},function(e,r,body){
			assert.equal(r.statusCode,200);
			done();
		});
	});
});

describe("Security Info Request Test",function(){  
	it("Good credentials should pass",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:security,userid:loggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"securityinfo",status:"success",msg:"retrieved security info successfully"});
			done();
		});
	});

	it("Invalid user credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:security,userid:invalidUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"securityinfo",status:"failure",msg:"user not found"});
			done();
		});
	});

	it("Invalid game credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:security,userid:loggedInUser,gameid:invalidGame}},function(e,r,body){
			assert.equal(body,{type:"securityinfo",status:"failure",msg:"game not found"});
			done();
		});
	});

	it("Invalid user login credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:security,userid:notLoggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"securityinfo",status:"failure",msg:"user not logged in"});
			done();
		});
	});

	it("Invalid user/game combo credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:security,userid:loggedInUser,gameid:gameNotOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"securityinfo",status:"failure",msg:"user not game owner"});
			done();
		});
	});
}); 

describe("Memory Info Request Test",function(){  
	it("Good credentials should pass",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:memory,userid:loggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"memoryinfo",status:"success",msg:"retrieved memory info successfully"});
			done();
		});
	});

	it("Invalid user credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:memory,userid:invalidUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"memoryinfo",status:"failure",msg:"user not found"});
			done();
		});
	});

	it("Invalid game credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:memory,userid:loggedInUser,gameid:invalidGame}},function(e,r,body){
			assert.equal(body,{type:"memoryinfo",status:"failure",msg:"game not found"});
			done();
		});
	});

	it("Invalid user login credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:memory,userid:notLoggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"memoryinfo",status:"failure",msg:"user not logged in"});
			done();
		});
	});

	it("Invalid user/game combo credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:memory,userid:loggedInUser,gameid:gameNotOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"memoryinfo",status:"failure",msg:"user not game owner"});
			done();
		});
	});
}); 

describe("Usage Info Request Test",function(){  
	it("Good credentials should pass",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:usage,userid:loggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"usageinfo",status:"success",msg:"retrieved usage info successfully"});
			done();
		});
	});

	it("Invalid user credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:usage,userid:invalidUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"usageinfo",status:"failure",msg:"user not found"});
			done();
		});
	});

	it("Invalid game credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:usage,userid:loggedInUser,gameid:invalidGame}},function(e,r,body){
			assert.equal(body,{type:"usageinfo",status:"failure",msg:"game not found"});
			done();
		});
	});

	it("Invalid user login credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:usage,userid:notLoggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"usageinfo",status:"failure",msg:"user not logged in"});
			done();
		});
	});

	it("Invalid user/game combo credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:usage,userid:loggedInUser,gameid:gameNotOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"usageinfo",status:"failure",msg:"user not game owner"});
			done();
		});
	});
}); 

describe("Features Info Request Test",function(){  
	it("Good credentials should pass",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:features,userid:loggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"featuresinfo",status:"success",msg:"retrieved features info successfully"});
			done();
		});
	});

	it("Invalid user credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:features,userid:invalidUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"featuresinfo",status:"failure",msg:"user not found"});
			done();
		});
	});

	it("Invalid game credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:features,userid:loggedInUser,gameid:invalidGame}},function(e,r,body){
			assert.equal(body,{type:"featuresinfo",status:"failure",msg:"game not found"});
			done();
		});
	});

	it("Invalid user login credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:features,userid:notLoggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"featuresinfo",status:"failure",msg:"user not logged in"});
			done();
		});
	});

	it("Invalid user/game combo credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:features,userid:loggedInUser,gameid:gameNotOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"featuresinfo",status:"failure",msg:"user not game owner"});
			done();
		});
	});
}); 

describe("SQL Query Test",function(){  
	it("Good credentials should pass",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:loggedInUser,gameid:gameOwnedByUser,query:validSQL}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"success",msg:"sql query successful"});
			done();
		});
	});

	it("Invalid user credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:invalidUser,gameid:gameOwnedByUser,query:validSQL}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"user not found"});
			done();
		});
	});

	it("Invalid game credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:loggedInUser,gameid:invalidGame,query:validSQL}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"game not found"});
			done();
		});
	});

	it("Invalid user login credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:notLoggedInUser,gameid:gameOwnedByUser,query:validSQL}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"user not logged in"});
			done();
		});
	});

	it("Invalid user/game combo credential should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:loggedInUser,gameid:gameNotOwnedByUser,query:validSQL}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"user not game owner"});
			done();
		});
	});

	it("Valid SQL query for wrong game should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:loggedInUser,gameid:gameOwnedByUser,query:validSQLWrongUser}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"query not related to users game"});
			done();
		});
	});

	it("Valid SQL query that modifies should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:loggedInUser,gameid:gameOwnedByUser,query:validSQLModifiesContent}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"query not related to users game"});
			done();
		});
	});

	it("Invalid SQL query should fail",function(done){
		request.post({url:baseUrl+"/developer/dashboard",form:{component:sqlquery,userid:loggedInUser,gameid:gameOwnedByUser,query:invalidSQL}},function(e,r,body){
			assert.equal(body,{type:"sqlquery",status:"failure",msg:"query not related to users game"});
			done();
		});
	});
}); 

describe("Bug Report Request Test",function(){  
	it("Getting bug report page should succeed",function(done){
		request.post({url:baseUrl+"/developer/bugreport"},function(e,r,body){
			assert.equal(r.statusCode,200);
			done();
		});
	});

	it("Good credentials should pass",function(done){
		request.post({url:baseUrl+"/developer/bugreport",form:{userid:loggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"bugreport",status:"success",msg:"retrieved bug report successfully"});
			done();
		});
	});

	it("Invalid user credential should fail",function(done){
		request.post({url:baseUrl+"/developer/bugreport",form:{userid:invalidUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"bugreport",status:"failure",msg:"user not found"});
			done();
		});
	});

	it("Invalid game credential should fail",function(done){
		request.post({url:baseUrl+"/developer/bugreport",form:{userid:loggedInUser,gameid:invalidGame}},function(e,r,body){
			assert.equal(body,{type:"bugreport",status:"failure",msg:"game not found"});
			done();
		});
	});

	it("Invalid user login credential should fail",function(done){
		request.post({url:baseUrl+"/developer/bugreport",form:{userid:notLoggedInUser,gameid:gameOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"bugreport",status:"failure",msg:"user not logged in"});
			done();
		});
	});

	it("Invalid user/game combo credential should fail",function(done){
		request.post({url:baseUrl+"/developer/bugreport",form:{userid:loggedInUser,gameid:gameNotOwnedByUser}},function(e,r,body){
			assert.equal(body,{type:"bugreport",status:"failure",msg:"user not game owner"});
			done();
		});
	});
}); 


