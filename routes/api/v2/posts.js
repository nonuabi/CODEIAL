const express = require("express");
const router = express.Router();

const postsApiController = require("../../../controller/api/v2/posts_api");

router.get("/", postsApiController.indexII);

module.exports = router;
