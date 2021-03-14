const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../Helpers/AuthHelper');

router.get('/GetUsers', AuthHelper.VerifyToken, UserCtrl.GetAllUsers);
router.get('/GetUserById/:id', AuthHelper.VerifyToken, UserCtrl.GetUser);
router.get(
  '/GetUserByName/:username',
  AuthHelper.VerifyToken,
  UserCtrl.GetUserByName
);
router.post('/user/view-profile', AuthHelper.VerifyToken, UserCtrl.ProfileView);
router.post(
  '/change-password',
  AuthHelper.VerifyToken,
  UserCtrl.ChangePassword
);

module.exports = router;
