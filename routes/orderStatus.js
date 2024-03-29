//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, orderStatusById, read, remove, update, list } = require('../controllers/orderStatus');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/orderStatus/create', create);
router.get('/orderStatus/:orderStatusId', read);
router.put('/orderStatus/update', update);
router.delete('/orderStatus/delete', remove);
//-------------list------------------------
router.get('/orderStatuss/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/orderStatusId', orderStatusById);
//---------------Export the module---------
module.exports = router;
