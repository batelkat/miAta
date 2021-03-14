const express = require('express');
const router = express.Router();

const NationCtrl = require('../controllers/nation');
const AuthHelper = require('../Helpers/AuthHelper');

router.get(
  '/GetNations',
  NationCtrl.GetAllNations
);
router.post(
  '/nation/CreateNation',
  NationCtrl.SetNewNation
);
router.post(
  '/nation/CreateReligion/:id',
  NationCtrl.SetReligion
);
router.post(
  '/nation/RemoveReligion',
  NationCtrl.RemoveReligion
);
router.post(
  '/nation/RemoveNation',
  NationCtrl.RemoveNation
);

router.post(
  '/nation/CreateQuestion/:id',
  NationCtrl.SetQuestion
);
router.post(
  '/nation/CreateKnowledgeItem/:id',
  NationCtrl.SetKnowledgeItem
);

router.post(
  '/nation/RemoveQuestion',
  NationCtrl.RemoveQuestion
);
router.post(
  '/nation/RemoveGoodToKnow',
  NationCtrl.RemoveGoodToKnow
);





module.exports = router;
