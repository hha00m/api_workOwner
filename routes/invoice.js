//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, invoiceById, read, remove, update, list, listForAccounting, remove_driver, remove_branch, list_driver, list_branch, create_driver, create_branch, invoicesList, invoicesList_branch, invoicesList_driver } = require('../controllers/invoice');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/invoice/create', create);
router.post('/invoice/create/driver', create_driver);
router.post('/invoice/create/branch', create_branch);
router.get('/invoice/:invoiceId', read);
router.put('/invoice/update', update);
router.delete('/invoice/delete', remove);
router.delete('/invoice/delete/driver', remove_driver);
router.delete('/invoice/delete/branch', remove_branch);
//-------------list------------------------
router.get('/invoices', list);
router.get('/invoices/driver', list_driver);
router.get('/invoices/branch', list_branch);
router.get('/invoices/list/stores', invoicesList);
router.get('/invoices/list/driver', invoicesList_driver);
router.get('/invoices/list/branch', invoicesList_branch);

//-------------params----------------------
router.param('/userId', userById);
router.param('/invoiceId', invoiceById);
//---------------Export the module---------
module.exports = router;
