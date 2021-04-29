const express = require('express');
const router = express.Router();


const userProfileController = require('../controller/user_profile_controller');


router.get('/profile', userProfileController.profile);

module.exports = router;