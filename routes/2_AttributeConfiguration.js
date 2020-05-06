//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, attributeConfigurationById, read, remove, update, list } = require('../controllers/2_AttributeConfiguration');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/attributeConfiguration/create/', create);
router.get('/attributeConfiguration/:attributeConfigurationId', read);
router.put('/attributeConfiguration/update/:attributeConfigurationId',   update);
router.delete('/attributeConfiguration/:attributeConfigurationId', remove);
//-------------list------------------------
router.get('/attributeConfigurations/', list);
 //-------------params----------------------
router.param('userId', userById);
router.param('attributeConfigurationId', attributeConfigurationById);
//---------------Export the module---------
module.exports = router;
