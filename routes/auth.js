const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signinMobile,
    signinusername,
    signout,
    requireSignin
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/register", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/signinmobile", signinMobile);
router.post("/signinusername", signinusername);
router.get("/signout", signout);

module.exports = router;
