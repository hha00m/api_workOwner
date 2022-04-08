//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, loanById, read, remove, update, list } = require('../controllers/loan');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/loan/create', create);
router.get('/loan/:loanId', read);
router.put('/loan/update', update);
router.delete('/loan/delete', remove);
//-------------list------------------------
router.get('/loans/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/loanId', loanById);
//---------------Export the module---------
module.exports = router;
