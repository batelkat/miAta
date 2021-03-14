const express = require('express');
const router = express.Router();

const SuggestedValuesCtrl = require('../controllers/suggested-values');
const AuthHelper = require('../Helpers/AuthHelper');


router.get(
  '/suggested-values',
  AuthHelper.VerifyToken,
  SuggestedValuesCtrl.GetAllSuggestedValues
);
router.post(
  '/suggested-values/create',
  AuthHelper.VerifyToken,
  SuggestedValuesCtrl.SetNewValue
);



module.exports = router;
