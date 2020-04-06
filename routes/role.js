const express = require("express");
const router = express.Router();
const {create,roleById,read,remove,update,list} = require("../controllers/role");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//-------------CRUD------------------------
router.post("/role/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/role/:roleId", read);
router.put("/role/:roleId/:userId",requireSignin,isAuth,isAdmin,update);
router.delete("/role/:roleId/:userId",requireSignin,isAuth,isAdmin,remove);
//-------------list------------------------
router.get("/roles/", list);
//-------------params----------------------
router.param("userId", userById);
router.param("roleId", roleById);
//---------------Export the module---------
module.exports = router;
