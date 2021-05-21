const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use the new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "836627288497-lmo5eppfiunrin8k6s7kpnsabl46mctg.apps.googleusercontent.com",
      clientSecret: "D0wj5usUx5OsTPJKSHEdr2Kr",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log(`Error in google strategy passport :: ${err}`);
          return;
        }
        console.log(profile);
        if (user) {
          //if found, set this user as req.user
          return done(null, user);
        } else {
          //if not found, create the user and set it as req.user
          User.create(
            {
              name: profile,
              email: profile.emails[0].value,
              passport: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(`Error in google strategy passport :: ${err}`);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
