//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, orderById, read, remove, update, list, photo } = require('../controllers/order');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/order/create/', create);
router.get('/order/:orderId', read);
router.put('/order/update/:orderId',   update);
router.delete('/order/:orderId', remove);
//-------------list------------------------
router.get('/orders/', list);

 //-------------params----------------------
router.param('userId', userById);
router.param('orderId', orderById);
//---------------Export the module---------
module.exports = router;
