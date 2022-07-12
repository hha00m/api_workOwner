//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, permissionById, read, remove, update, list } = require('../controllers/permission');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/permission/create/', isLogined, create);
router.get('/permission/:permissionId', isLogined, read);
router.put('/permission/update/:permissionId', isLogined, update);
router.delete('/permission/:permissionId', isLogined, remove);
//-------------list------------------------
router.get('/permissions/', isLogined, list);
//-------------params----------------------
router.param('userId', isLogined, userById);
router.param('permissionId', isLogined, permissionById);
//---------------Export the module---------
module.exports = router;
