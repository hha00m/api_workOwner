//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, shipmentById, read, remove, update, list } = require('../controllers/shipment');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/shipment/create', create);
router.get('/shipment/:shipmentId', read);
router.put('/shipment/update', update);
router.delete('/shipment/delete', remove);
//-------------list------------------------
router.get('/shipments', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/shipmentId', shipmentById);
//---------------Export the module---------
module.exports = router;
