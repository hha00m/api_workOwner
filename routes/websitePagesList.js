//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, websitePagesListById, read, remove, update, list } = require('../controllers/websitePagesList');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/websitePagesList/create/', create);
router.get('/websitePagesList/:websitePagesListId', read);
router.put('/websitePagesList/update/:websitePagesListId',   update);
router.delete('/websitePagesList/:websitePagesListId', remove);
//-------------list------------------------
router.get('/websitePagesLists/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('websitePagesListId', websitePagesListById);
//---------------Export the module---------
module.exports = router;
