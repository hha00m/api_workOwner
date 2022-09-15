//-----------------Imports Lib-------------
const express = require('express');
const router = express.Router();
//-----------------Imports-----------------
const { create, journalEntryById, read, remove, update, list } = require('../../controllers/financeControllers/journalEntry');
const { userById } = require('../../controllers/user');
const isLogined = require('../../middleware/auth');
//-------------CRUD------------------------
router.post('/journalEntry/create', isLogined, create);
router.get('/journalEntry/:journalEntryId', isLogined, read);
router.put('/journalEntry/update', isLogined, update);
router.delete('/journalEntry/delete', isLogined, remove);
//-------------list------------------------
router.get('/journalEntrys/', isLogined, list);
//-------------params----------------------
router.param('/userId', isLogined, userById);
router.param('/journalEntryId', isLogined, journalEntryById);
//---------------Export the module---------
module.exports = router;
