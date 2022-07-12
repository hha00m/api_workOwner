//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, driverById, read, remove, update,
    list, listPrices, listStores, removeDriverFromTown, updateTownsPrice,
    removeDriverFromAllTown } = require('../controllers/driver');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/driver/create', isLogined, create);
router.get('/driver/:driverId', isLogined, read);
router.put('/driver/update', isLogined, update);
router.put('/driver/update/price', isLogined, updateTownsPrice);
router.put('/driver/removeDriverTownn', isLogined, removeDriverFromTown);
router.put('/driver/removeDriverAllTowns', isLogined, removeDriverFromAllTown);
router.delete('/driver/delete', isLogined, remove);
//-------------list------------------------
router.get('/drivers/', isLogined, list);
router.get('/drivers/prices', isLogined, listPrices);
router.get('/drivers/towns', isLogined, listStores);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/driverId', isLogined, driverById);
//---------------Export the module---------
module.exports = router;
