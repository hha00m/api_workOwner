const express = require("express");
const router = express.Router();

const {
    create,
    townById,
    read,
    remove,
    update,
    list
} = require("../controllers/town");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/town/:townId", read);
router.post("/town/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/town/:townId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/town/:townId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.get("/towns", list);

router.param("userId", userById);
router.param("townId", townById);

module.exports = router;
