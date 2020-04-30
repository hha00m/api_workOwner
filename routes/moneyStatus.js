//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, moneyStatusById, read, remove, update, list } = require('../controllers/moneyStatus');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/moneyStatus/create/', create);
router.get('/moneyStatus/:moneyStatusId', read);
router.put('/moneyStatus/update/:moneyStatusId',   update);
router.delete('/moneyStatus/:moneyStatusId', remove);
//-------------list------------------------
router.get('/moneyStatuses/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('moneyStatusId', moneyStatusById);
//---------------Export the module---------
module.exports = router;
