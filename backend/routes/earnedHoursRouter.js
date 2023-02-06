const express = require("express");
const EarnedHours = require("../models/earnedHours");

const earnedHoursRouter = express.Router();

earnedHoursRouter
    .route("/")
    .get((req, res, next) => {
        let { startDate, endDate, userName } = req.query;
        console.log({ startDate, endDate });

        EarnedHours.find({
            userName: { $eq: userName },
            date: {
                $gte: new Date(new Date(startDate)),
                $lte: new Date(new Date(endDate)),
            },
        })
            .sort({ date: "asc" })
            .then((earnedHours) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(earnedHours);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        EarnedHours.create(req.body)
            .then((earnedHours) => {
                console.log("Earned Hours Added", earnedHours);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application");
                res.json(earnedHours);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        EarnedHours.findByIdAndDelete(req.params.earnedHoursId)
            .then((earnedHours) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(earnedHours);
            })
            .catch((err) => next(err));
    });
