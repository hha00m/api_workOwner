//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, driverById, read, remove, update, list, listPrices, listStores, removeDriverFromTown } = require('../controllers/driver');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/driver/create', create);
router.get('/driver/:driverId', read);
router.put('/driver/update', update);
router.put('/driver/removeDriverTownn', removeDriverFromTown);
router.delete('/driver/delete', remove);
//-------------list------------------------
router.get('/drivers/', list);
router.get('/drivers/prices', listPrices);
router.get('/drivers/towns', listStores);
//-------------params----------------------
router.param('/userId', userById);
router.param('/driverId', driverById);
//---------------Export the module---------
module.exports = router;
