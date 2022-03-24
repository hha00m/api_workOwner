//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, clientById, read, remove, update, list, listPrices, listStores } = require('../controllers/client');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/client/create', create);
router.get('/client/:clientId', read);
router.put('/client/update', update);
router.delete('/client/delete', remove);
//-------------list------------------------
router.get('/clients/', list);
router.get('/clients/prices', listPrices);
router.get('/clients/stores', listStores);
//-------------params----------------------
router.param('/userId', userById);
router.param('/clientId', clientById);
//---------------Export the module---------
module.exports = router;
