//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, newJobTitleById, read, remove, update, list } = require('../controllers/newJobTitle');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/newJobTitle/create/', create);
router.get('/newJobTitle/:newJobTitleId', read);
router.put('/newJobTitle/update/:newJobTitleId',   update);
router.delete('/newJobTitle/:newJobTitleId', remove);
//-------------list------------------------
router.get('/newJobTitles/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('newJobTitleId', newJobTitleById);
//---------------Export the module---------
module.exports = router;
