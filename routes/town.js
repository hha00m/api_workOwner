//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, townById, read, remove, update, list } = require('../controllers/town');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/town/create', create);
router.get('/town/:townId', read);
router.put('/town/update', update);
router.delete('/town/delete', remove);
//-------------list------------------------
router.get('/towns/', list);
//-------------params----------------------
router.param('/userId', userById);
router.param('/townId', townById);
//---------------Export the module---------
module.exports = router;
