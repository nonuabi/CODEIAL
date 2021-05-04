const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      req.flash("success", "comment published!");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "You can not post comment here!");
    return res.redirect("/");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let post_id = comment.post;
      comment.remove();
      let post = await Post.findByIdAndUpdate(post_id, {
        $pull: { comments: req.params.id },
      });
      req.flash("success", "comment is deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You can not delete comment!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "You can not delete comment!");
    return res.redirect("/");
  }
};
