//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, revenueById, read, remove, update, list } = require('../../controllers/financeControllers/revenue');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/revenue/create', isLogined, create);
router.get('/revenue/:revenueId', isLogined, read);
router.put('/revenue/update', isLogined, update);
router.delete('/revenue/delete', isLogined, remove);
//-------------list------------------------
router.get('/revenues/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/revenueId', isLogined, revenueById);
//---------------Export the module---------
module.exports = router;
