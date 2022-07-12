//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, loanById, remove, update, list } = require('../controllers/loan');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/loan/create', isLogined, create);
router.put('/loan/update', isLogined, update);
router.delete('/loan/delete', isLogined, remove);
//-------------list------------------------
router.get('/loans/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/loanId', isLogined, loanById);
//---------------Export the module---------
module.exports = router;
