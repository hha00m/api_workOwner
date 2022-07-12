//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, clientById, read, remove, update, list, listPrices, listStores } = require('../controllers/client');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/client/create', isLogined, create);
router.get('/client/:clientId', read);
router.put('/client/update', isLogined, update);
router.delete('/client/delete', isLogined, remove);
//-------------list------------------------
router.get('/clients/', isLogined, list);
router.get('/clients/prices', isLogined, listPrices);
router.get('/clients/stores', isLogined, listStores);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/clientId', isLogined, clientById);
//---------------Export the module---------
module.exports = router;
