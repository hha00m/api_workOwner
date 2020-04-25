//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create,storeById, read, remove, update, list } = require('../controllers/store');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/client/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/store/create/', create);
router.put('/store/update/:storeId',   update);
router.delete('/store/delete/:storeId', remove);
//-------------list------------------------
router.get('/stores/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('storeId', storeById);
//---------------Export the module---------
module.exports = router;
