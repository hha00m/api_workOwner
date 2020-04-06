//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,trackingById,read,remove,update,list} = require("../controllers/tracking");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {orderById} =require("../controllers/order");
//-------------CRUD------------------------
router.post("/tracking/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/tracking/:trackingId", read);
router.put("/tracking/:trackingId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/tracking/:trackingId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/trackings/:orderId", list);
//-------------params----------------------
router.param("userId", userById);
router.param("orderId", orderById);
router.param("trackingId", storeById);
//---------------Export the module---------
module.exports = router;
