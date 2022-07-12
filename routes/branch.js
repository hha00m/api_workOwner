//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, branchById, read, remove, update, list } = require('../controllers/branch');
const { userById } = require('../controllers/user');
const isLogined = require('../middleware/auth');
//-------------CRUD------------------------
router.post('/branch/create/', isLogined, create);
router.get('/branch/:branchId', read);
router.put('/branch/update/', isLogined, update);
router.delete('/branch/delete', isLogined, remove);
//-------------list------------------------
router.get('/branchs/', isLogined, list);
//-------------params----------------------
router.param('userId', isLogined, userById);
router.param('branchId', isLogined, branchById);
//---------------Export the module---------
module.exports = router;
