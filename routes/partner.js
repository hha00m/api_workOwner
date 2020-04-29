//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, partnerById, read, remove, update, list,logo } = require('../controllers/partner');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/partner/create/', create);
router.get('/partner/:partnerId', read);
router.put('/partner/update/:partnerId',   update);
router.delete('/partner/:partnerId', remove);
//-------------list------------------------
router.get('/partners/', list);
router.get("/partner/logo/:partnerId", logo);

 //-------------params----------------------
router.param('userId', userById);
router.param('partnerId', partnerById);
//---------------Export the module---------
module.exports = router;
