//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, attributeNameById, read, remove, update, list } = require('../controllers/2_attributeName');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
 router.post('/attributeName/create/', create);
router.get('/attributeName/:attributeNameId', read);
router.put('/attributeName/update/:attributeNameId',   update);
router.delete('/attributeName/:attributeNameId', remove);
//-------------list------------------------
router.get('/attributeNames/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('attributeNameId', attributeNameById);
//---------------Export the module---------
module.exports = router;
