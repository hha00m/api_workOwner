//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,invoiceById,read,remove,update,list,listForClient,listForStaff} = require("../controllers/invoice");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {clientById} =require("../controllers/client");
const {staffById} =require("../controllers/staff");
//-------------CRUD------------------------
router.post("/invoice/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/invoice/:invoiceId", read);
router.put("/invoice/:invoiceId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/invoice/:invoiceId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/invoices/", list);
router.get("/invoices/:clientId", listForClient);
router.get("/invoices/:staffId", listForStaff);
//-------------params----------------------
router.param("userId", userById);
router.param("clientId", clientById);
router.param("staffId", staffById);
router.param("invoiceId", invoiceById);
//---------------Export the module---------
module.exports = router;
