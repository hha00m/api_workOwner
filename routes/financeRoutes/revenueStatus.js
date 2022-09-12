//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, revenueStatusById, read, remove, update, list } = require('../../controllers/financeControllers/revenueStatus');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/revenueStatus/create', isLogined, create);
router.get('/revenueStatus/:revenueStatusId', isLogined, read);
router.put('/revenueStatus/update', isLogined, update);
router.delete('/revenueStatus/delete', isLogined, remove);
//-------------list------------------------
router.get('/revenueStatuss/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/revenueStatusId', isLogined, revenueStatusById);
//---------------Export the module---------
module.exports = router;
