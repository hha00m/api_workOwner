//-----------------Imports Lib-------------
const express = require("express");
const router = express.Router();
//-----------------Imports-----------------
const {create,staffById,read,remove,update,list} = require("../controllers/staff");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//-------------CRUD------------------------
router.post("/staff/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/staff/:staffId", read);
router.put("/staff/:staffId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/staff/:staffId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/staffs/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("staffId", staffById);
//---------------Export the module---------
module.exports = router;
