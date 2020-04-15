//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {getRule} = require("../controllers/rule");
//-------------list------------------------
router.get("/rule/", getRule);

module.exports = router;
