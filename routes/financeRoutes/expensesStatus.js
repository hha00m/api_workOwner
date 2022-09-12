//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, expensesStatusById, read, remove, update, list } = require('../../controllers/financeControllers/expensesStatus');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/expensesStatus/create', isLogined, create);
router.get('/expensesStatus/:expensesStatusId', isLogined, read);
router.put('/expensesStatus/update', isLogined, update);
router.delete('/expensesStatus/delete', isLogined, remove);
//-------------list------------------------
router.get('/expensesStatuss/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/expensesStatusId', isLogined, expensesStatusById);
//---------------Export the module---------
module.exports = router;
