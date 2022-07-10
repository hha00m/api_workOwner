//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { returnPdf, readpdf, pdfGen, pdfReportDriver, pdfDeliveried_client, pdfDeliveried_driver, pdfDeliveried_branch, pdfReturnClient, pdfReturnBranch, pdfReturnDriver, readimg, pdfNew } = require('../controllers/pdf');
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

router.put('/pdfs/return/client', pdfReturnClient);
router.put('/pdfs/return/branch', pdfReturnBranch);
router.put('/pdfs/return/driver', pdfReturnDriver);

router.put('/pdfs/reports', pdfReportDriver);
router.get('/pdfs/read', readpdf);
router.get('/pdfs/readimg', readimg);
//---------------Export the module---------
module.exports = router;
