//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { returnPdf, readpdf } = require('../controllers/pdf');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.get('/pdf/return', returnPdf);
// router.delete('/town/delete', remove);
//-------------list------------------------
router.put('/pdfs/genrate', returnPdf);
router.get('/pdfs/read', readpdf);

//---------------Export the module---------
module.exports = router;
