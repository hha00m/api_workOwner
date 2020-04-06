//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,receiptById,read,remove,update,list} = require("../controllers/receipt");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {clientById} =require("../controllers/client");
const {staffById} =require("../controllers/staff");
//-------------CRUD------------------------
router.post("/receipt/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/receipt/:receiptId", read);
router.put("/receipt/:receiptId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/receipt/:receiptId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/receipts/", list);
router.get("/receipts/:clientId", list);
router.get("/receipts/:staffId", list);
//-------------params----------------------
router.param("userId", userById);
router.param("clientId", clientById);
router.param("staffId", staffById);
router.param("receiptId", receiptById);
//---------------Export the module---------
module.exports = router;
