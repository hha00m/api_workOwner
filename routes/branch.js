const express = require("express");
const router = express.Router();

const {
    create,
    branchById,
    read,
    remove,
    update,
    list,
    photo
} = require("../controllers/branch");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/branch/:branchId", read);
router.post("/branch/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/branch/:branchId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/branch/:branchId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

 router.get("/branches", list);
router.get("/branch/photo/:branchId", photo);


router.param("userId", userById);
router.param("branchId", branchById);

module.exports = router;
