//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, clientById, read, remove, update, list, photo } = require('../controllers/client');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.post('/client/create/', create);
router.get('/client/:clientId', read);
router.put('/client/update/:clientId',   update);
router.delete('/client/:clientId', remove);
//-------------list------------------------
router.get('/clients/', list);
router.get("/client/photo/:clientId", photo);

 //-------------params----------------------
router.param('userId', userById);
router.param('clientId', clientById);
//---------------Export the module---------
module.exports = router;
