const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    // if (!user || user.password != req.body.password) {
    //   return res.json(422, {
    //     message: "Invalid Username or Passport",
    //   });
    // }
    if (!user) {
      return res.json(422, {
        message: "user not found",
      });
    }
    if (user.password != req.body.password) {
      return res.json(422, {
        message: "password is wrong",
      });
    }

    return res.json(200, {
      message: "Sign in Successful, here is your token, please keep it safe.",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "10000" }),
      },
    });
  } catch (err) {
    console.log(`error in creating session  ::  ${err}`);
    return res.json(500, {
      message: "Internal Sever Error",
      Error: err,
    });
  }
};
