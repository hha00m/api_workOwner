//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, categoryById, read, remove, update, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/category/create/', create);
router.get('/category/:categoryId', read);
router.put('/category/update/:categoryId',   update);
router.delete('/category/:categoryId', remove);
//-------------list------------------------
router.get('/categories/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('categoryId', categoryById);
//---------------Export the module---------
module.exports = router;
