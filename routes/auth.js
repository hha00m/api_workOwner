const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signinMobile,
    signinusername,
    signout,
    requireSignin,
    currnetUser
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/register", signup);
router.post("/login", signin);
// router.post("/loginMobile", signinMobile);
// router.post("/login/account", signinusername);
router.get("/outLogin", signout);

module.exports = router;
