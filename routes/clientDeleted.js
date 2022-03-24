//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, clientDeletedById, read, remove, update, list, listPrices, listStores } = require('../controllers/clientDeleted');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/clientDeleted/create', create);
router.get('/clientDeleted/:clientDeletedId', read);
router.put('/clientDeleted/update', update);
router.delete('/clientDeleted/delete', remove);
//-------------list------------------------
router.get('/clientDeleteds/', list);
router.get('/clientDeleteds/prices', listPrices);
router.get('/clientDeleteds/stores', listStores);
//-------------params----------------------
router.param('/userId', userById);
router.param('/clientDeletedId', clientDeletedById);
//---------------Export the module---------
module.exports = router;
