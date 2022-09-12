//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, assetsById, read, remove, update, list } = require('../../controllers/financeControllers/assets');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/assets/create', isLogined, create);
router.get('/assets/:assetsId', isLogined, read);
router.put('/assets/update', isLogined, update);
router.delete('/assets/delete', isLogined, remove);
//-------------list------------------------
router.get('/assets/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/assetsId', isLogined, assetsById);
//---------------Export the module---------
module.exports = router;
