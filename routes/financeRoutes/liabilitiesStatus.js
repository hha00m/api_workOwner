//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, liabilitiesStatusById, read, remove, update, list } = require('../../controllers/financeControllers/liabilitiesStatus');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/liabilitiesStatus/create', isLogined, create);
router.get('/liabilitiesStatus/:liabilitiesStatusId', isLogined, read);
router.put('/liabilitiesStatus/update', isLogined, update);
router.delete('/liabilitiesStatus/delete', isLogined, remove);
//-------------list------------------------
router.get('/liabilitiesStatuss/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/liabilitiesStatusId', isLogined, liabilitiesStatusById);
//---------------Export the module---------
module.exports = router;
