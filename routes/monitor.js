//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { listGlobal, listClients, listDrivers, listBranchs } = require('../controllers/monitor');
// const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const isLogined = require('../middleware/auth');
//-------------list------------------------
router.get('/monitor/global', isLogined, listGlobal);
router.get('/monitor/clients', isLogined, listClients);
router.get('/monitor/drivers', isLogined, listDrivers);
router.get('/monitor/branchs', isLogined, listBranchs);

module.exports = router;
