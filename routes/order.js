//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,orderById,read,remove,update,list} = require("../controllers/order");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//-------------CRUD------------------------
router.post("/order/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/order/:orderId", read);
router.put("/order/:orderId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/order/:orderId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/orders/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("orderId", orderById);
//---------------Export the module---------
module.exports = router;
