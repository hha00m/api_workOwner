//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, websitePageById, read, remove, update, list } = require('../controllers/websitePage');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/websitePage/create/', isLogined, create);
router.get('/websitePage/:websitePageId', isLogined, read);
router.put('/websitePage/update/:websitePageId', isLogined, update);
router.delete('/websitePage/:websitePageId', isLogined, remove);
//-------------list------------------------
router.get('/websitePages/', isLogined, list);
//-------------params----------------------
router.param('userId', isLogined, userById);
router.param('websitePageId', isLogined, websitePageById);
//---------------Export the module---------
module.exports = router;
