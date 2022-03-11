//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, governmentById, read, remove, update, list } = require('../controllers/government');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/government/create', create);
router.get('/government/:governmentId', read);
router.put('/government/update', update);
router.delete('/government/delete', remove);
//-------------list------------------------
router.get('/governments/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/governmentId', governmentById);
//---------------Export the module---------
module.exports = router;
