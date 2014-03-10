var assert = require('assert');
var request = require('request');
var baseUrl = "http://game-3627-platform.com";  //just a temporary one will change later to our domain
var validPW = "ABC123456";
var invalidPW = "1";
var validEmail = "jh3627@stern.nyu.edu";
var invalidEmail = "jh3627";


describe("Sign Up Test",function(){

	it("Getting sign up page shoudl succeed",function(done){
		request.post({url:baseUrl+"/developer/signup"},function(e,r,body){
			assert.equal(r.statusCode,200);
			done();
		});
	});


	it("Invalid email credential should fail",function(done){
		request.post({url:baseUrl+"/developer/signup",form:{email:invalidEmail,password:validPW}},function(e,r,body){
			assert.equal(body,{type:"signup",status:"failure",msg:"invalid email"});
			done();
		});
	});

	it("Invalid pw credential should fail",function(done){
		request.post({url:baseUrl+"/developer/signup",form:{email:validEmail,password:invalidPW}},function(e,r,body){
			assert.equal(body,{type:"signup",status:"failure",msg:"invalid password"});
			done();
		});
	});

	it("Good credential should pass",function(done){
		request.post({url:baseUrl+"/developer/signup",form:{email:validEmail,password:validPW}},function(e,r,body){
			assert.equal(body,{type:"signup",status:"success",msg:"sign up success"});
			done();
		});
	}); 
});

describe("Email Verification Test",function(done){
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

describe("Login Test",function(){  // test for non-existing user is not possible as I have no way to verifying if a user exist in the database
	it("Getting login page shoudl succeed",function(done){
		request.post({url:baseUrl+"/developer/login"},function(e,r,body){
			assert.equal(r.statusCode,200);
			done();
		});
	});

	it("Invalid email credential should fail",function(done){
		request.post({url:baseUrl+"/developer/login",form:{email:invalidEmail,password:validPW}},function(e,r,body){
			assert.equal(body,{type:"login",status:"failure",msg:"invalid email"});
			done();
		});
	});

	it("Invalid pw credential should fail",function(done){
		request.post({url:baseUrl+"/developer/login",form:{email:validEmail,password:invalidPW}},function(e,r,body){
			assert.equal(body,{type:"login",status:"failure",msg:"invalid password"});
			done();
		});
	});

	it("Good credential should pass",function(done){
		request.post({url:baseUrl+"/developer/login",form:{email:validEmail,password:validPW}},function(e,r,body){
			assert.equal(body,{type:"login",status:"success",msg:"sign up success"});
			done();
		});
	});
}); 


