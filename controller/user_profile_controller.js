module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title : "User Profile",
    })
}

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
