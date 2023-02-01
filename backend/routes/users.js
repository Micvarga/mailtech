const express = require("express");
const User = require("../models/users");
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/signup", (req, res) => {
    console.log(req.body.employeeId);
    User.register(
        new User({ employeeId: req.body.employeeId }),
        req.body.password,
        (err) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-type", "application/json");
                res.json({ err: err });
            } else {
                passport.authenticate("local")(reg, res, () => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                        success: true,
                        status: "Registration Successful!",
                    });
                });
            }
        }
    );
});

router.post("/login", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ sucess: true, status: "You are successfully logged in!" });
});

router.get("/logout", (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie("session-id");
        res.redirect("/");
    } else {
        const err = new Error("You are not logged in!");
        err.status = 401;
        return next(err);
    }
});

module.exports = router;
