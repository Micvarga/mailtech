const { response } = require("express");
const express = require("express");
const hoursWorked = require("../models/hoursWorked");

const hoursWorkedRouter = express.Router();

hoursWorkedRouter.get("/", (req, res, next) => {
    // variables for differnt form fields sent from client
    let username = req.body.username;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    console.log(username, startDate, endDate);
    hoursWorked
        .find({
            // query to find hours worked based on client input via form
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
});
hoursWorkedRouter.post("/", (req, res, next) => {
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
});
hoursWorkedRouter.delete((req, res, next) => {
    hoursWorked
        .findByIdAndDelete(req.body._id)
        .then((hoursWorked) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(hoursWorked);
        })
        .catch((err) => next(err));
});

module.exports = hoursWorkedRouter;
