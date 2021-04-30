const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log(`error in finding user id in cookies :: ${err}`);
        return res.render("home");
      }
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/user/sign-in");
      }
    });
  } else {
    return res.redirect("/user/sign-in");
  }
};

module.exports.signUp = function (req, res) {
  return res.render("user_signUp", {
    title: "Codeial | SignUP",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_signIn", {
    title: "Codeial | SignIn",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(`error in finding user in signing up :: ${err}`);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log(`error in creating user while signing up :: ${err}`);
          return;
        }
        return res.redirect("/user/sign-in");
      });
    } else {
      res.redirect("/user/sign-in");
    }
  });
};

//sign in and create a session for the user
// module.exports.createSession = function (req, res) {
//   //steps to authenticate
//   //find the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log(`error in finding user in signing up :: ${err}`);
//       return;
//     }

//     //handle user found
//     if (user) {
//       //handle password which don't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       //handle session creation
//       res.cookie(("user_id", user.id));
//       return res.redirect("/user/profile");
//     } else {
//       //handle user not found
//       return res.redirect("back");
//     }
//   });
// };
module.exports.createSession = function (req, res) {
  // steps to authenticate
  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }
    // handle user found
    if (user) {
      // handle password which doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }

      // handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/user/profile");
    } else {
      // handle user not found

      return res.redirect("back");
    }
  });
};
