//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, configById, read, update, list } = require('../controllers/websiteConfig');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/config/create/', isLogined, create);
router.put('/config/update/', isLogined, update);
//-------------list------------------------
router.get('/configs/', isLogined, list);
//-------------params----------------------
router.param('userId', isLogined, userById);
router.param('configId', isLogined, configById);
//---------------Export the module---------
module.exports = router;
