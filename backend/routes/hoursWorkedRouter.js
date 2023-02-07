const express = require("express");
const hoursWorked = require("../models/hoursWorked");

const hoursWorkedRouter = express.Router();

hoursWorkedRouter
    .route("/")
    .get((req, res, next) => {
        let { startDate, endDate, username } = req.query;
        console.log({ startDate, endDate });

        hoursWorked
            .find({
                username: { $eq: username },
                date: {
                    $gte: new Date(new Date(startDate)),
                    $lte: new Date(new Date(endDate)),
                },
            })
            .sort({ date: "asc" })
            .then((hoursWorked) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(hoursWorked);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body.username);
        console.log(req.body.date);
        console.log(req.body.hoursWorked);
        hoursWorked
            .create(req.body)
            .then((hoursWorked) => {
                console.log("Worked Hours Added", hoursWorked);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(hoursWorked);
            })
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        hoursWorked
            .findByIdAndDelete(req.params.hoursWorkedId)
            .then((hoursWorked) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(hoursWorked);
            })
            .catch((err) => next(err));
    });

module.exports = hoursWorkedRouter;
