module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
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
  //To-do later
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  //todo-lists
};
