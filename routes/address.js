//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,addressById,read,remove,update,list} = require("../controllers/address");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//-------------CRUD------------------------
router.post("/address/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/address/:addressId", read);
router.put("/address/:addressId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/address/:addressId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/addresses/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("addressId", addressById);
//---------------Export the module---------
module.exports = router;
