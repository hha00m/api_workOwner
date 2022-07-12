//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, townById, read, remove, update, list, townsByGovernment, townsNotAlocated } = require('../controllers/town');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/town/create', isLogined, create);
router.get('/town/:townId', isLogined, read);
router.put('/town/update', isLogined, update);
router.delete('/town/delete', isLogined, remove);
//-------------list------------------------
router.get('/towns/', isLogined, list);
router.get('/towns/notAllocated', isLogined, townsNotAlocated);
router.get('/townsByGovernment', isLogined, townsByGovernment);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/townId', isLogined, townById);
//---------------Export the module---------
module.exports = router;
