const express = require("express");
const router = express.Router();

const {
    create,
    clientById,
    read,
    remove,
    update,
    list,
    photo
} = require("../controllers/client");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/client/:clientId", read);
router.post("/client/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/client/:clientId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/client/:clientId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.get("/clients", list);
router.get("/client/photo/:clientId", photo);

router.param("userId", userById);
router.param("clientId", clientById);

module.exports = router;
