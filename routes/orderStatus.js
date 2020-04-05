const express = require("express");
const router = express.Router();

const {
    create,
    orderStatusById,
    read,
    update,
    remove,
    list
} = require("../controllers/orderStatus");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/orderStatu/:orderStatusId", read);
router.post("/orderStatu/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/orderStatu/:orderStatusId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/orderStatu/:orderStatusId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/orderStatus", list);

router.param("orderStatusId", orderStatusById);
router.param("userId", userById);

module.exports = router;
