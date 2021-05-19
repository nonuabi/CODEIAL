module.exports.indexII = function (req, res) {
  return res.json(200, {
    message: "this is a v2",
    posts: [],
  });
};
