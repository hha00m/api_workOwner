//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { listGlobal } = require('../controllers/monitor');
// const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

router.get('/monitor/global', listGlobal);

module.exports = router;
