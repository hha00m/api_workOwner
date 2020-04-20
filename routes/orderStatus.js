//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, OrderStatusById, read, remove, update, list } = require('../controllers/orderStatus');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/orderstatus/create/', create);
router.get('/orderstatusread/:OrderStatusById', read);
router.put('/orderstatus/update/:OrderStatusById',   update);
router.delete('/orderstatus/remove/:OrderStatusById', remove);
//-------------list------------------------
router.get('/orderstatus/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('OrderStatusById', OrderStatusById);
//---------------Export the module---------
module.exports = router;
