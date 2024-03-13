const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router
  .route('/signup')
  .post(userController.handleFileUpload, userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/user-verify').get(userController.userVerify);
module.exports = router;
