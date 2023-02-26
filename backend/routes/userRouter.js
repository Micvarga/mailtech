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
router.get("/", authenticate.verifyUser, authenticate.verifyAdmin, getUsers);

router.post(
    "/signup",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    signUpUser
);

router.post("/login", passport.authenticate("local"), loginUser);

router.post("/logout", logoutUser);

module.exports = router;
