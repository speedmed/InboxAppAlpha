/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');


module.exports = {

	showHomePage: function (req, res) {
    
  // If not logged in, show the public view.
    if (!req.session.authenticated) {
      
      return res.view('index');

    }else{

      return res.redirect("/dashboard");

    }

  },

  dashboard: function(req, res){

          // console.log('', req.isAuthenticated());
          
          return res.view('dashboard', {user: req.session.me});
    
  }
	
};

