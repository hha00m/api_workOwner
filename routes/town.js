//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, townById, read, remove, update, list } = require('../controllers/town');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/town/create/', create);
router.get('/town/:townID', read);
router.put('/town/:townID/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/town/:townID/:userId', requireSignin, isAuth, isAdmin, remove);
//-------------list------------------------
router.get('/towns/', list);
//-------------params----------------------
router.param('userId', userById);
router.param('townID', townById);
//---------------Export the module---------
module.exports = router;
