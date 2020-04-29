//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, employeeById, read, remove, update, list, photo } = require('../controllers/employee');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/employee/create/', create);
router.get('/employee/:employeeId', read);
router.put('/employee/update/:employeeId',   update);
router.delete('/employee/:employeeId', remove);
//-------------list------------------------
router.get('/employee/', list);
router.get("/employee/photo/:employeeId", photo);

 //-------------params----------------------
router.param('userId', userById);
router.param('employeeId', employeeById);
//---------------Export the module---------
module.exports = router;
