//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,orderTypeById,read,remove,update,list} = require("../controllers/orderType");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//-------------CRUD------------------------
router.post("/orderType/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/orderType/:orderTypeId", read);
router.put("/orderType/:orderTypeId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/orderType/:orderTypeId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/orderTypes/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("orderTypeId", orderTypeById);
//---------------Export the module---------
module.exports = router;
