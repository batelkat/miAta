const express = require('express');
const router = express.Router();

const SuggestedQuestionCtrl = require('../controllers/suggested-question');
const AuthHelper = require('../Helpers/AuthHelper');

router.get(
  '/suggested-question',
  AuthHelper.VerifyToken,
  SuggestedQuestionCtrl.GetAllSuggestedQuestion
);

router.post(
  '/suggested-question/CreateQuestion',
  AuthHelper.VerifyToken,
  SuggestedQuestionCtrl.SetNewQuestion
);

module.exports = router;
