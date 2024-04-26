const passport = require("passport");
const user = require("./models/user");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID:   process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //local Callback
    // callbackURL: "http://localhost:8080/auth/google/callback",
    //hosting callback
    callbackURL: "https://maketrip-in.onrender.com/listings/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   done(null,profile);
  }
));
passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
})