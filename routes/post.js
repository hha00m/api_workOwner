//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, branchById, remove, update, list } = require('../controllers/post');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/post/create/', create);
router.put('/post/update/', update);
router.delete("/post/delete", remove);

//-------------list------------------------
router.get('/posts/', list);
//-------------params----------------------
router.param('userId', userById);
router.param('postId', branchById);
//---------------Export the module---------
module.exports = router;
