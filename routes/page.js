//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, pageById, read, remove, update, list, addSubpage } = require('../controllers/page');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/page/create', isLogined, create);
router.get('/page/:pageId', isLogined, read);
router.put('/page/update', isLogined, update);
router.put('/page/addSubpage', isLogined, addSubpage);
router.delete('/page/delete', isLogined, remove);
//-------------list------------------------
router.get('/pages/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/pageId', isLogined, pageById);
//---------------Export the module---------
module.exports = router;
