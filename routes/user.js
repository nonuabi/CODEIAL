const express = require("express");
const router = express.Router();

//profile route
const userProfileController = require("../controller/user_profile_controller");
router.get("/profile", userProfileController.profile);

//signIn route

router.get("/sign-in", userProfileController.signIn);

//signUp route

router.get("/sign-up", userProfileController.signUp);

router.post("/create", userProfileController.create);

router.post("/create-session", userProfileController.createSession);

module.exports = router;
