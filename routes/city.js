//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, cityById, read, remove, update, list } = require('../controllers/city');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/city/create/', create);
router.get('/city/:cityId', read);
router.put('/city/update/:cityId',   update);
router.delete('/city/:cityId', remove);
//-------------list------------------------
router.get('/cities/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('cityId', cityById);
//---------------Export the module---------
module.exports = router;
