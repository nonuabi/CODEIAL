const Post = require("../models/post");

module.exports.home = function (req, res) {
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
  Post.find({})
    .populate("user")
    .exec(function (err, post) {
      if (err) {
        console.log(`error in fetch the user post data 
      from the db :: ${err}`);
        return;
      }
      return res.render("home", {
        title: "Home",
        arr: post,
      });
    });
};
