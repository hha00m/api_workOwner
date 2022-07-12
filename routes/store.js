//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, storeById, read, remove, update, list } = require('../controllers/store');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/store/create', isLogined, create);
router.get('/store/:storeId', isLogined, read);
router.put('/store/update', isLogined, update);
router.delete('/store/delete', isLogined, remove);
//-------------list------------------------
router.get('/stores/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/storeId', isLogined, storeById);
//---------------Export the module---------
module.exports = router;
