//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,storeById,read,remove,update,list} = require("../controllers/store");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {clientById} =require("../controllers/client");
//-------------CRUD------------------------
router.post("/store/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/store/:storeID", read);
router.put("/store/:storeID/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/store/:storeID/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/stores/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("clientId", clientById);
router.param("storeID", storeById);
//---------------Export the module---------
module.exports = router;
