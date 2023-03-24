const user = require("../models/user");
const passport = require("passport");
const authenticate = require("../authenticate");

const getUserInfo = (req, res, next) => {
    console.log(req.body._id);
    user.findById(req.user._id)
        .then((userInfo) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(userInfo);
        })
        .catch((err) => next(err));
};

const getUsers = (req, res, next) => {
    user.find()
        .then((users) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(users);
        })
        .catch((err) => next(err));
};

const signUpUser = (req, res, next) => {
    console.log(req.body.username);
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    user.register(
        new user({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }),
        req.body.password,
        (err) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({ err: err });
            } else {
                passport.authenticate("local")(req, res, () => {
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
};

const loginUser = (req, res, next) => {
    const token = authenticate.getToken({ _id: req.user._id });
    console.log(req.user._id);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
    });
};

const logoutUser = (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie("session-id");
        res.redirect("/");
    } else {
        const err = new Error("You are not logged in!");
        err.status = 401;
        return next(err);
    }
};

module.exports = {
    getUserInfo,
    getUsers,
    signUpUser,
    loginUser,
    logoutUser,
};
