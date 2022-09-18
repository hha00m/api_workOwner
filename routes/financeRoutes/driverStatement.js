//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, driverStatementById, read, remove, update, list } = require('../../controllers/financeControllers/driverStatement');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/driverStatement/create', isLogined, create);
router.get('/driverStatement/:driverStatementId', isLogined, read);
router.put('/driverStatement/update', isLogined, update);
router.delete('/driverStatement/delete', isLogined, remove);
//-------------list------------------------
router.get('/driverStatements/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/driverStatementId', isLogined, driverStatementById);
//---------------Export the module---------
module.exports = router;
