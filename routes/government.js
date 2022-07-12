//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, governmentById, read, remove, update, list } = require('../controllers/government');
const { userById } = require('../controllers/user');
const isLogined = require('../middleware/auth');
//-------------CRUD------------------------
router.post('/government/create', isLogined, create);
router.get('/government/:governmentId', isLogined, read);
router.put('/government/update', isLogined, update);
router.delete('/government/delete', isLogined, remove);
//-------------list------------------------
router.get('/governments/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/governmentId', isLogined, governmentById);
//---------------Export the module---------
module.exports = router;
