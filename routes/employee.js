//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, employeeById, read, remove, update, list } = require('../controllers/employee');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/employee/create', create);
router.get('/employee/:employeeId', read);
router.put('/employee/update', update);
router.delete('/employee/delete', remove);
//-------------list------------------------
router.get('/employees/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/employeeId', employeeById);
//---------------Export the module---------
module.exports = router;
