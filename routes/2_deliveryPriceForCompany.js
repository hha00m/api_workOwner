//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, deliveryPriceForCompanyById, read, remove, update, list } = require('../controllers/2_deliveryPriceForCompany');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/deliveryPriceForCompany/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/deliveryPriceForCompany/create/', create);
router.get('/deliveryPriceForCompany/:deliveryPriceForCompanyId', read);
router.put('/deliveryPriceForCompany/update/:deliveryPriceForCompanyId',   update);
router.delete('/deliveryPriceForCompany/:deliveryPriceForCompanyId', remove);
//-------------list------------------------
router.get('/deliveryPriceForCompanies/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('deliveryPriceForCompanyId', deliveryPriceForCompanyById);
//---------------Export the module---------
module.exports = router;
