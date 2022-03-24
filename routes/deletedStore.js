//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, storeById, read, remove, update, list } = require('../controllers/deletedStore');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/deletedStore/create', create);
router.get('/deletedStore/:deletedStoreId', read);
router.put('/deletedStore/update', update);
router.delete('/deletedStore/delete', remove);
//-------------list------------------------
router.get('/deletedStores/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/deletedStoreId', storeById);
//---------------Export the module---------
module.exports = router;
