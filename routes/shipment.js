//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, shipmentById, read, remove, update, list, listForAccounting, updateInvoice, ShipmentByClick, listForAccounting_branch, listForAccounting_driver, ShipmentByClick_branch, ShipmentByClick_driver, updateInvoice_branch, updateInvoice_driver } = require('../controllers/shipment');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/shipment/create', create);
router.get('/shipment/:shipmentId', read);
router.put('/shipment/update', update);
router.put('/shipment/addInvoice', updateInvoice);
router.put('/shipment/addInvoice/driver', updateInvoice_driver);
router.put('/shipment/addInvoice/branch', updateInvoice_branch);
router.delete('/shipment/delete', remove);
//-------------list------------------------
router.get('/shipments', list);
router.get('/shipments/accounting', listForAccounting);
router.get('/shipments/accounting/branch', listForAccounting_branch);
router.get('/shipments/accounting/driver', listForAccounting_driver);
router.get('/shipments/ShipmentByClick', ShipmentByClick);
router.get('/shipments/ShipmentByClick/driver', ShipmentByClick_driver);
router.get('/shipments/ShipmentByClick/branch', ShipmentByClick_branch);
//-------------params----------------------
router.param('/userId', userById);
router.param('/shipmentId', shipmentById);
//---------------Export the module---------
module.exports = router;
