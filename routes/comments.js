const express = require("express");
const router = express.Router();
const passport = require("passport");
const comments_controller = require("../controller/commens_controller");

router.post(
  "/create",
  passport.checkAuthentication,
  comments_controller.create
);

module.exports = router;
