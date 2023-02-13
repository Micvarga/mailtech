const express = require("express");
const productionEntry = require("../models/productionEntry");

const productionRouter = express.Router();

productionRouter.get("/", (req, res, next) => {
    // variables for different form fields sent from client
    let username = req.body.username;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    productionEntry
        .find({
            // query to find hours worked based o nclient input via form
            username: { $eq: req.body.username },
            date: {
                $gte: new Date(new Date(startDate)),
                $lte: new Date(new Date(endDate)),
            },
        })
        // sort query in ascending order
        .sort({ date: "asc" })
        // production is a promise variable with results from query
        .then((production) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(production);
        })
        .catch((err) => next(err));
});

productionRouter.post("/", (req, res, next) => {
    productionEntry
        .create(req.body)
        .then((production) => {
            console.log("Production Entry Added", production);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                status: "Production entry successful!",
                production: production,
            });
        })
        .catch((err) => next(err));
});

productionRouter.delete("/", (req, res, next) => {
    productionEntry
        .findByIdAndDelete(req.body._id)
        .then((production) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                status: "Entry sucessfully deleted!",
                production: production,
            });
        })
        .catch((err) => next(err));
});

module.exports = productionRouter;
