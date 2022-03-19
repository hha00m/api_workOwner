//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, pageById, read, remove, update, list, addSubpage } = require('../controllers/page');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/page/create', create);
router.get('/page/:pageId', read);
router.put('/page/update', update);
router.put('/page/addSubpage', addSubpage);
router.delete('/page/delete', remove);
//-------------list------------------------
router.get('/pages/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/pageId', pageById);
//---------------Export the module---------
module.exports = router;
