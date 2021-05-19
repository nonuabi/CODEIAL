const express = require("express");
const router = express.Router();

const homeController = require("../controller/home_controller");

router.get("/", homeController.home);
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/comments", require("./comments"));

router.use("/api", require("./api"));

// router.post("/signUp", require("./signUp"));
// router.use("/signIn", require("./signIn"));

module.exports = router;
