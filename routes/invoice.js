//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, invoiceById, read, remove, update, list, listForAccounting } = require('../controllers/invoice');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/invoice/create', create);
router.get('/invoice/:invoiceId', read);
router.put('/invoice/update', update);
router.delete('/invoice/delete', remove);
//-------------list------------------------
router.get('/invoices', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/invoiceId', invoiceById);
//---------------Export the module---------
module.exports = router;
