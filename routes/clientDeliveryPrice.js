const express = require("express");
const router = express.Router();

const {
    create,
    clientDeliveryPriceById,
    read,
    remove,
    update,
    list
} = require("../controllers/clientDeliveryPrice");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {clientById} =require("../controllers/client");

router.get("/clientDeliveryPrice/:clientDeliveryPriceId", read);
router.post("/clientDeliveryPrice/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/clientDeliveryPrice/:clientDeliveryPriceId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/clientDeliveryPrice/:clientDeliveryPriceId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

 router.get("/clientDeliveryPrices/:clientId", list);


router.param("userId", userById);
router.param("clientId", clientById);
router.param("clientDeliveryPriceId", clientDeliveryPriceById);

module.exports = router;
