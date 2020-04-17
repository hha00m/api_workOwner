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

router.post("/register", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/signinmobile", signinMobile);
router.post("/login/account", signinusername);
router.get("/signout", signout);

module.exports = router;
