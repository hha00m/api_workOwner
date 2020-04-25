//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, websitePageById, read, remove, update, list } = require('../controllers/websitePage');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/websitePage/create/', create);
router.get('/websitePage/:websitePageId', read);
router.put('/websitePage/update/:websitePageId',   update);
router.delete('/websitePage/:websitePageId', remove);
//-------------list------------------------
router.get('/websitePages/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('websitePageId', websitePageById);
//---------------Export the module---------
module.exports = router;
