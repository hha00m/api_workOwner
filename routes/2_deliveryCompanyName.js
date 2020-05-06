//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, deliveryCompanyNameById, read, remove, update, list } = require('../controllers/2_deliveryCompanyName');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/deliveryCompanyName/create/', create);
router.get('/deliveryCompanyName/:deliveryCompanyNameId', read);
router.put('/deliveryCompanyName/update/:deliveryCompanyNameId',   update);
router.delete('/deliveryCompanyName/:deliveryCompanyNameId', remove);
//-------------list------------------------
router.get('/deliveryCompanyNames/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('deliveryCompanyNameId', deliveryCompanyNameById);
//---------------Export the module---------
module.exports = router;
