//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, invoiceById, read, remove, update, list, listForAccounting, remove_driver, remove_branch, list_driver, list_branch, create_driver, create_branch, invoicesList, invoicesList_branch, invoicesList_driver } = require('../controllers/invoice');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/invoice/create', isLogined, create);
router.post('/invoice/create/driver', isLogined, create_driver);
router.post('/invoice/create/branch', isLogined, create_branch);
router.get('/invoice/:invoiceId', isLogined, read);
router.put('/invoice/update', isLogined, update);
router.delete('/invoice/delete', isLogined, remove);
router.delete('/invoice/delete/driver', isLogined, remove_driver);
router.delete('/invoice/delete/branch', isLogined, remove_branch);
//-------------list------------------------
router.get('/invoices', isLogined, list);
router.get('/invoices/driver', isLogined, list_driver);
router.get('/invoices/branch', isLogined, list_branch);
router.get('/invoices/list/stores', isLogined, invoicesList);
router.get('/invoices/list/driver', isLogined, invoicesList_driver);
router.get('/invoices/list/branch', isLogined, invoicesList_branch);

//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/invoiceId', isLogined, invoiceById);
//---------------Export the module---------
module.exports = router;
