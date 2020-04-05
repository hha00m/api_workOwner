const express = require("express");
const router = express.Router();

const {
    create,
    storeById,
    read,
    remove,
    update,
    list
} = require("../controllers/store");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {clientById} =require("../controllers/client");

router.get("/store/:storeID", read);
router.post("/store/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/store/:storeID/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/store/:storeID/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

 router.get("/stores/:storeID", list);


router.param("userId", userById);
router.param("clientId", clientById);
router.param("storeID", storeById);

module.exports = router;
