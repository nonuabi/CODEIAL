const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       name: req.body.name,
  //       email: req.body.email,
  //     },
  //     function (err, user) {
  //       return res.redirect("back");
  //     }
  //   );
  // } else {
  //   res.status(401).send("Unauthorized");
  // }
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log(`Multer Error ::  ${err}`);
        } else {
          user.name = req.body.name;
          user.email = req.body.email.id;

          if (req.file) {
            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar = User.avatarPath + "/" + req.file.filename;
          }
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_signUp", {
    title: "Codeial | SignUP",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
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
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "You have logged out!");
  req.logout();

  return res.redirect("/");
};
