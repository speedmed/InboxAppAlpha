var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


function findById(id, fn) {
  User.findOne({id: id}).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    } 
    if(!user){
      return fn(null, null);
    }
    
      return fn(null, user);
    
  });
}

function findBygoogleId(id, fn) {
  User.findOne({
    googleId: id
  }).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    }
    if(!user){
      return fn(null, null);
    }  
      return fn(null, user);
    
  });
}

//save the user ID in the session as req.session.passport.user = {id : "xxxx"} 
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//retrieve the whole object with user id from database and store it in req.user
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: "secret",
    clientSecret: "secret",
    callbackURL: "http://localhost:1337/oauth2callback",
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, params, profile, done) {

  	 sails.log.debug('auth refreshToken :    ', refreshToken);

     sails.log.debug('auth accessToken :    ', accessToken);

     sails.log.debug('auth params :    ', params);

    findBygoogleId(profile.id, function (err, user) {

      if(err){
        
        return done(err);
      }
      // Create a new User if it doesn't exist yet
      if (!user) {

        User.create({

          googleId: profile.id

          // You can also add any other data you are getting back from Facebook here 
          // as long as it is in your model

        }).exec(function createCB (err, user) {
          if (user) {
            req.session.me = profile.displayName;
            req.session.GAccessToken = accessToken;
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          } else {

            return done(err, null, {
              message: 'There was an error logging you in with Facebook'
            });
          }
        });

      // If there is already a user, return it
      } else {
        req.session.me = profile.displayName;
        req.session.GAccessToken = accessToken;
        return done(null, user, {
          message: 'Logged In Successfully'
        });
      }
    });
  }
));