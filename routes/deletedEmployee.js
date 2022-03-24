//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, deletedEmployeeById, read, remove, update, list } = require('../controllers/deleteddeletedEmployee');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/deletedEmployee/create', create);
router.get('/deletedEmployee/:deletedEmployeeId', read);
router.put('/deletedEmployee/update', update);
router.delete('/deletedEmployee/delete', remove);
//-------------list------------------------
router.get('/deletedEmployees/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/deletedEmployeeId', deletedEmployeeById);
//---------------Export the module---------
module.exports = router;
