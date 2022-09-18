//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, branchStatementById, read, remove, update, list } = require('../../controllers/financeControllers/branchStatement');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/branchStatement/create', isLogined, create);
router.get('/branchStatement/:branchStatementId', isLogined, read);
router.put('/branchStatement/update', isLogined, update);
router.delete('/branchStatement/delete', isLogined, remove);
//-------------list------------------------
router.get('/branchStatements/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/branchStatementId', isLogined, branchStatementById);
//---------------Export the module---------
module.exports = router;
