//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, ownersEquityTypeById, read, remove, update, list } = require('../../controllers/financeControllers/ownersEquityType');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/ownersEquityType/create', isLogined, create);
router.get('/ownersEquityType/:ownersEquityTypeId', isLogined, read);
router.put('/ownersEquityType/update', isLogined, update);
router.delete('/ownersEquityType/delete', isLogined, remove);
//-------------list------------------------
router.get('/ownersEquityTypes/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/ownersEquityTypeId', isLogined, ownersEquityTypeById);
//---------------Export the module---------
module.exports = router;
