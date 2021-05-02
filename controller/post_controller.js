const post = require("../models/post");
const Comments = require("../models/comment");

module.exports.create = function (req, res) {
  post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log(`error in creating a post ${err}`);
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  post.findById(req.params.id, function (err, post) {
    // .id means converting the object id into String
    if (post.user == req.user.id) {
      post.remove();

      Comments.deleteMany({ post: req.params.id }, function (err) {
        if(err){
          console.log(`comments are not deleting form the db :: ${err}`);
          return;
        }
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
