//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
const isLogined = require('../middleware/auth');
//-----------------Imports-----------------
const { create, employeeById, read, remove, update, list } = require('../controllers/employee');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/employee/create', isLogined, create);
router.get('/employee/:employeeId', isLogined, read);
router.put('/employee/update', isLogined, update);
router.delete('/employee/delete', isLogined, remove);
//-------------list------------------------
router.get('/employees/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/employeeId', isLogined, employeeById);
//---------------Export the module---------
module.exports = router;
