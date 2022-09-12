//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, expensesById, read, remove, update, list } = require('../../controllers/financeControllers/expenses');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/expenses/create', isLogined, create);
router.get('/expenses/:expensesId', isLogined, read);
router.put('/expenses/update', isLogined, update);
router.delete('/expenses/delete', isLogined, remove);
//-------------list------------------------
router.get('/expenses/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/expensesId', isLogined, expensesById);
//---------------Export the module---------
module.exports = router;
