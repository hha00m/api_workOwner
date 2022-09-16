//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, ownersEquityById, read, remove, update, list, updateMoney } = require('../../controllers/financeControllers/ownersEquity');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/ownersEquity/create', isLogined, create);
router.get('/ownersEquity/:ownersEquityId', isLogined, read);
router.put('/ownersEquity/update', isLogined, update);
router.put('/ownersEquity/updateMoney', isLogined, updateMoney);
router.delete('/ownersEquity/delete', isLogined, remove);
//-------------list------------------------
router.get('/ownersEquitys/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/ownersEquityId', isLogined, ownersEquityById);
//---------------Export the module---------
module.exports = router;
