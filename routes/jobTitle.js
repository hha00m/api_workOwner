//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, jobTitleById, read, remove, update, listJobTitles, listPages } = require('../controllers/jobTitle');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/jobTitle/create', isLogined, create);
router.get('/jobTitle/:jobTitleId', isLogined, read);
router.put('/jobTitle/update', isLogined, update);
router.delete('/jobTitle/delete', isLogined, remove);
//-------------list------------------------
router.get('/jobTitles/', isLogined, listJobTitles);
router.get('/jobTitles/pages', isLogined, listPages);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/jobTitleId', isLogined, jobTitleById);
//---------------Export the module---------
module.exports = router;
