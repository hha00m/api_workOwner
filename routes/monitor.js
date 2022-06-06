//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { listGlobal, listClients, listDrivers, listBranchs } = require('../controllers/monitor');
// const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

router.get('/monitor/global', listGlobal);
router.get('/monitor/clients', listClients);
router.get('/monitor/drivers', listDrivers);
router.get('/monitor/branchs', listBranchs);

module.exports = router;
