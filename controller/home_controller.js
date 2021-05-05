const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Codeial || Home",
      arr: posts,
      all_users: users,
    });
  } catch (err) {
    console.log(`Error :: ${err}`);
    return;
  }

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
