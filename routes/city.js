const express = require("express");
const router = express.Router();

const {
    create,
    cityById,
    read,
    update,
    remove,
    list
} = require("../controllers/city");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/city/:cityId", read);
router.post("/city/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/city/:cityId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/city/:cityId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/cities", list);

router.param("cityId", cityById);
router.param("userId", userById);

module.exports = router;
