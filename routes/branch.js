//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, branchById, read, remove, update, list } = require('../controllers/branch');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/branch/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/branch/create/', create);
router.get('/branch/:branchId', read);
router.put('/branch/update/:branchId',   update);
router.delete('/branch/:branchId', remove);
//-------------list------------------------
router.get('/branchs/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('branchId', branchById);
//---------------Export the module---------
module.exports = router;
