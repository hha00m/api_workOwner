//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, clientStatementById, read, remove, update, list } = require('../../controllers/financeControllers/clientStatement');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/clientStatement/create', isLogined, create);
router.get('/clientStatement/:clientStatementId', isLogined, read);
router.put('/clientStatement/update', isLogined, update);
router.delete('/clientStatement/delete', isLogined, remove);
//-------------list------------------------
router.get('/clientStatement/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/clientStatementId', isLogined, clientStatementById);
//---------------Export the module---------
module.exports = router;
