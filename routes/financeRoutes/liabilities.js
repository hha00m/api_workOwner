//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, liabilitiesById, read, remove, update, list } = require('../../controllers/financeControllers/liabilities');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/liabilities/create', isLogined, create);
router.get('/liabilities/:liabilitiesId', isLogined, read);
router.put('/liabilities/update', isLogined, update);
router.delete('/liabilities/delete', isLogined, remove);
//-------------list------------------------
router.get('/liabilities/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/liabilitiesId', isLogined, liabilitiesById);
//---------------Export the module---------
module.exports = router;
