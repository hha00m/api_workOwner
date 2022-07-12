//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, shipmentById, read, remove, update, list, listForAccounting,
    updateInvoice, ShipmentByClick, listForAccounting_branch, listForAccounting_driver,
    ShipmentByClick_branch, ShipmentByClick_driver, updateInvoice_branch,
    updateInvoice_driver } = require('../controllers/shipment');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/shipment/create', isLogined, create);
router.get('/shipment/:shipmentId', isLogined, read);
router.put('/shipment/update', isLogined, update);
router.put('/shipment/addInvoice', isLogined, updateInvoice);
router.put('/shipment/addInvoice/driver', isLogined, updateInvoice_driver);
router.put('/shipment/addInvoice/branch', isLogined, updateInvoice_branch);
router.delete('/shipment/delete', isLogined, remove);
//-------------list------------------------
router.get('/shipments', isLogined, list);
router.get('/shipments/accounting', isLogined, listForAccounting);
router.get('/shipments/accounting/branch', isLogined, listForAccounting_branch);
router.get('/shipments/accounting/driver', isLogined, listForAccounting_driver);
router.get('/shipments/ShipmentByClick', isLogined, ShipmentByClick);
router.get('/shipments/ShipmentByClick/driver', isLogined, ShipmentByClick_driver);
router.get('/shipments/ShipmentByClick/branch', isLogined, ShipmentByClick_branch);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/shipmentId', isLogined, shipmentById);
//---------------Export the module---------
module.exports = router;
