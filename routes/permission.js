//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, permissionById, read, remove, update, list } = require('../controllers/permission');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/permission/create/', create);
router.get('/permission/:permissionId', read);
router.put('/permission/update/:permissionId',   update);
router.delete('/permission/:permissionId', remove);
//-------------list------------------------
router.get('/permissions/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('permissionId', permissionById);
//---------------Export the module---------
module.exports = router;
