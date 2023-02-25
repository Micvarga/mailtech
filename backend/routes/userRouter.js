const express = require("express");
const authenticate = require("../authenticate");
const passport = require("passport");

const router = express.Router();

const {
    getUsers,
    signUpUser,
    loginUser,
    logoutUser,
} = require("../controllers/userController");

/* GET users listing. */
router.get("/", getUsers);

router.post("/signup", authenticate.verifyUser, signUpUser);

router.post("/login", passport.authenticate("local"), loginUser);

router.post("/logout", logoutUser);

module.exports = router;
