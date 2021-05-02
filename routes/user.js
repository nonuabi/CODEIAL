const express = require("express");
const router = express.Router();
const passport = require("passport");
//profile route
const userProfileController = require("../controller/user_profile_controller");
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userProfileController.profile
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  userProfileController.update
);
//signIn route

router.get("/sign-in", userProfileController.signIn);

//signUp route

router.get("/sign-up", userProfileController.signUp);

router.post("/create", userProfileController.create);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userProfileController.createSession
);

router.get("/sign-out", userProfileController.destroySession);

module.exports = router;
