//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, clientStatementById, read, remove, update, list, increaseBalanceAssets } = require('../../controllers/financeControllers/clientStatement');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/clientStatement/create', isLogined, create);
router.get('/clientStatement/:clientStatementId', isLogined, read);
router.put('/clientStatement/update', isLogined, update);
router.put('/clientStatement/updateMoney', isLogined, increaseBalanceAssets);
router.delete('/clientStatement/delete', isLogined, remove);
//-------------list------------------------
router.get('/clientStatements/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/clientStatementId', isLogined, clientStatementById);
//---------------Export the module---------
module.exports = router;
