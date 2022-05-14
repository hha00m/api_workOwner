//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { returnPdf, readpdf, pdfGen, pdfReportDriver, pdfDeliveried_client, pdfDeliveried_driver, pdfDeliveried_branch } = require('../controllers/pdf');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
//-------------CRUD------------------------
// router.get('/pdf/return', returnPdf);
// router.delete('/town/delete', remove);
//-------------list------------------------
router.put('/pdfs/genrate', pdfGen);
router.put('/pdfs/genrate/client', pdfDeliveried_client);
router.put('/pdfs/genrate/driver', pdfDeliveried_driver);
router.put('/pdfs/genrate/branch', pdfDeliveried_branch);
router.put('/pdfs/reports', pdfReportDriver);
router.get('/pdfs/read', readpdf);
//---------------Export the module---------
module.exports = router;
