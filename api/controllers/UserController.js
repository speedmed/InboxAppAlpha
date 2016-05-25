/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

module.exports = {
	
	'google': function (req, res, next) {
     
     	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://mail.google.com/'],accessType: 'offline' })(req, res, next);
  	},

  	

  	'googleCallback': function (req, res, next) {
  
  		passport.authenticate('google', function(err, user, info) {
    		if (err) { return next(err); }

    		if (!user) { return res.redirect('/'); }

    		req.logIn(user, function(err) {
      		
      			if (err) { return next(err); }
      			
      			req.session.authenticated = true;
      			// console.log(req.user);
      			// console.log(req.session.me);
      			
      			return res.redirect('/dashboard');
    		});
  		})(req, res, next);
	}

};


