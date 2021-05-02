const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, post) {
      if (err) {
        console.log(`error in fetch the user post data
      from the db :: ${err}`);
        return;
      }

      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial || Home",
          arr: post,
          all_users: users,
        });
      });
    });

  // console.log(req.cookies);
  // res.cookie("user_id", 25);
  // return res.render("home", {
  //   title: "home",
  // });

  // Post.find({}, function (err, post) {
  //   if (err) {
  //     console.log(`error in fetch the user post data
  //     from the db :: ${err}`);
  //     return;
  //   }
  //   return res.render("home", {
  //     title: "Home",
  //     arr: post,
  //   });
  // });

  //populate the user of each post
};
