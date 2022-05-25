//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, branchById, read, update, list } = require('../controllers/websiteConfig');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/branch/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/config/create/', create);
router.put('/config/update/', update);
//-------------list------------------------
router.get('/configs/', list);
//-------------params----------------------
router.param('userId', userById);
router.param('configId', branchById);
//---------------Export the module---------
module.exports = router;
