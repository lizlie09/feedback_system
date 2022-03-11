'use strict';

const { drop } = require('lodash');

var 
    Crypto = require('../../lib/Crypto'),
    _ = require('underscore'),
    Async = require("async"),

    Users = require('../../database/models/users'),
	Rate = require('../../database/models/rate'),
	Ranking = require('../../database/models/ranking'),

    internals = {};

/**
* Handlers
*/
internals.noscript = function (req, reply) {
  reply.view('noscript.html');
}
internals.error404 = function (req, reply) {
  reply.view('error404.html');
}
internals.logout = function(req, reply) {
  req.cookieAuth.clear();
  return reply.redirect('/login');
}
//LOgin
internals.login = function (req, reply) {
  reply.view('login.html', {
    message:req.query.message,
    alertType: req.query.alertType,
    success: req.query.success
  });
}
//Auth
internals.authentication = function (req, reply) {
	let email = req.payload.email;
	let password = req.payload.password;
	Users.findOne({ email: email })
	.lean()
	.exec((err, data) => {
	  if (err) {
		console.log(err);
		return reply.redirect('/login?message=Account not found! &alertType=danger');
	  }
	  if (data != null) {
		if(data.void == false){
		  if (Crypto.decrypt(data.password) !=password) {
			console.log('password not found');
			return reply.redirect('/login?message=Incorrect password.&alertType=danger');
		  }else if(data.scope[0] == 'admin'){
			console.log('Login:', data.firstname);
			let user = data;
			req.cookieAuth.set(user);
			return reply.redirect('/admin/dashboard');
		  }else if(data.scope[0] == 'visitor'){
			console.log('Login:', data.firstname);
			let user = data;
			req.cookieAuth.set(user);
			return reply.redirect('/visitor/dashboard');
		  }else if(data.scope[0] == 'establishment'){
			console.log('Login:', data.firstname);
			let user = data;
			req.cookieAuth.set(user);
			return reply.redirect('/establishment/dashboard');
		  }else {
			return reply.redirect('/login');
		  }
		}else {
		  return reply.redirect('/login?message=Authentication failed! No account found.&alertType=danger');
		}
	  } else {
		  return reply.redirect('/login?message=Authentication failed! No account found.&alertType=danger');
	  }
	});
  }
  
//Landing
internals.landing = function (req, reply) {
	reply.view('landing.html', {
	  message:req.query.message,
	  alertType: req.query.alertType,
	  success: req.query.success
	});
};
//Rate
internals.rate = function (req, reply) {
	var establishments = {};
	Async.series(
		[
      (callback) => {
        Users.find({
			$and: [
				{void: false},
				{isEstablishment: true}
			]
		})
					.lean()
					.exec((err, data) => {
						if (err) {
							console.log(err);
						}
						establishments = data;
						return callback(null);
					});
      },
    ],
    function (callback) {
		reply.view('rate.html', {
			credentials: req.auth.credentials,
			message: req.query.message,
			alertType: req.query.alertType,
			success: req.query.success,
			establishments
		});
    }
  );
};

//Creating Rating Stars
internals.ratings = function(req, reply){
	//Get year
	const d = new Date();
	let year = d.getFullYear();
	var concern = false;
	//Check if rate is null
	if (req.payload.star1 == null || req.payload.star2 == null || req.payload.star3 == null || req.payload.star4 == null || req.payload.star5 == null || req.payload.star6 == null || req.payload.star7 == null || req.payload.star8 == null || req.payload.star9 == null || req.payload.star10 == null || req.payload.establishment == null || req.payload.fullname == null){
		reply.redirect('/rate?message= Error Please fillup the form&alertType=danger');
	}
	//Check if comment is empty
	else{
		if(req.payload.rateComment == ''){
			concern=true
		}
		var payload = {
			rate: true,
			rateComment: req.payload.rateComment,
			fullname : req.payload.fullname,
			establishment : req.payload.establishment,
			rate_one : req.payload.star1,
			rate_two : req.payload.star2,
			rate_three : req.payload.star3,
			rate_four : req.payload.star4,
			rate_five : req.payload.star5,
			rate_six : req.payload.star6,
			rate_seven: req.payload.star7,
			rate_eight : req.payload.star8,
			rate_nine : req.payload.star9,
			rate_ten : req.payload.star10,
			concern: concern
		};
		
		Ranking.findOne({
		$and:[
			{name: req.payload.establishment},
			{year: year}
		]})
		.lean()
		.exec((err, dataTotal) => {
			if (err) {
				console.log(err);
			}
			console.log('===>', dataTotal);
			//Old establishment and year
			if(dataTotal!=null){
				console.log('OLLLDD');
				var input = parseInt(req.payload.star1) + parseInt(req.payload.star2) + parseInt(req.payload.star3) + parseInt(req.payload.star4) + parseInt(req.payload.star5)
				 + parseInt(req.payload.star6) + parseInt(req.payload.star7) + parseInt(req.payload.star8) + parseInt(req.payload.star9) + parseInt(req.payload.star10);
				var total = parseInt(dataTotal.rate) + parseInt(input);
				var inc = parseInt(dataTotal.increment) + 1;
				var rankings = {
					name : req.payload.establishment,
					year : year,
					rate: total,
					increment: inc
				};
				Ranking.update(
					{ _id: dataTotal._id },
					{
						$set: rankings,
					},
					function (err, dataSave) {
						if (err) {
							console.log(err);
						}
						console.log(dataSave);
						var rate = new Rate(payload);
						rate.save(function(err, data){
							if(err){
								console.log(err)
							}
							console.log(data);
							reply.redirect('/rate?message=Successfully Rated&alertType=success');
						})
					},
				);
			}else{
			//New establishment and year
				console.log('NEWWWWW');
				var input = parseInt(req.payload.star1) + parseInt(req.payload.star2) + parseInt(req.payload.star3) + parseInt(req.payload.star4) + parseInt(req.payload.star5)
				+ parseInt(req.payload.star6) + parseInt(req.payload.star7) + parseInt(req.payload.star8) + parseInt(req.payload.star9) + parseInt(req.payload.star10);
				var inc = 1;
				var rankings = {
					name : req.payload.establishment,
					year : year,
					rate: input,
					increment: inc
				};
				console.log(input, '=========', rankings.rate);
				var rateTotal = new Ranking(rankings);
				rateTotal.save(function(err, dataSave){
					if(err){
						console.log(err)
					}
					console.log(dataSave);
					var rate = new Rate(payload);
					rate.save(function(err, data){
						if(err){
							console.log(err)
						}
						console.log(data);
						reply.redirect('/rate?message=Successfully Rated&alertType=success');
					})
				})
			}
		});
	}
}

module.exports = internals;
