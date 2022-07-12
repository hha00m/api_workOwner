//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, postById, remove, update, list } = require('../controllers/post');
const isLogined = require('../middleware/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
router.post('/post/create/', isLogined, create);
router.put('/post/update/', isLogined, update);
router.delete("/post/delete", isLogined, remove);

//-------------list------------------------
router.get('/posts/', isLogined, list);
//-------------params----------------------
router.param('userId', isLogined, userById);
router.param('postId', isLogined, postById);
//---------------Export the module---------
module.exports = router;
