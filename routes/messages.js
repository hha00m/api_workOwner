//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,messageById,read,remove,update,list} = require("../controllers/message");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
// const {orderById} =require("../controllers/order");
//-------------CRUD------------------------
router.post("/message/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/message/:messageId", read);
router.put("/message/:messageId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/message/:messageId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/messages/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("messageId", messageById);
// router.param("orderId", orderById);
//---------------Export the module---------
module.exports = router;
