//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, assetsStatusById, read, remove, update, list } = require('../../controllers/financeControllers/assetsStatus');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/assetsStatus/create', isLogined, create);
router.get('/assetsStatus/:assetsStatusId', isLogined, read);
router.put('/assetsStatus/update', isLogined, update);
router.delete('/assetsStatus/delete', isLogined, remove);
//-------------list------------------------
router.get('/assetsStatuss/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/assetsStatusId', isLogined, assetsStatusById);
//---------------Export the module---------
module.exports = router;
