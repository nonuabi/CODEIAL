const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log(`error occure while finding the post in database :: ${err}`);
      return;
    }

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          //handle error
          if (err) {
            console.log(
              `error occure while create a comment doc in db :: ${err}`
            );
            return;
          }

          post.comments.push(comment);
          post.save();

          return res.redirect("/");
        }
      );
    }
  });
};
