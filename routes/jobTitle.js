//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, jobTitleById, read, remove, update, listJobTitles, listPages } = require('../controllers/jobTitle');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/jobTitle/create', create);
router.get('/jobTitle/:jobTitleId', read);
router.put('/jobTitle/update', update);
router.delete('/jobTitle/delete', remove);
//-------------list------------------------
router.get('/jobTitles/', listJobTitles);
router.get('/jobTitles/pages', listPages);
//-------------params----------------------
router.param('/userId', userById);
router.param('/jobTitleId', jobTitleById);
//---------------Export the module---------
module.exports = router;
