const express = require("express");
const User = require("../models/user");

const router = express.Router();

const {
    getUsers,
    signUpUser,
    loginUser,
    logoutUser,
} = require("../controllers/userController");

/* GET users listing. */
router.get("/", getUsers);

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
