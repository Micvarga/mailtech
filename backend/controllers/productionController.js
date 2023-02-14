const productionEntry = require("../models/productionEntry");

const getProduction = (req, res, next) => {
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
};

const getProductionSummary = (req, res, next) => {
    let username = req.body.username;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    productionEntry
        .aggregate([
            {
                $match: {
                    username: { $eq: req.body.username },
                },
            },
            {
                $match: {
                    date: {
                        $gte: new Date(new Date(startDate)),
                        $lte: new Date(new Date(endDate)),
                    },
                },
            },
            {
                $unwind: {
                    path: "$production",
                },
            },
            {
                $group: {
                    _id: "$production.task",
                    totalVolume: {
                        $sum: "$production.volume",
                    },
                    totalCredits: {
                        $sum: "$production.credit",
                    },
                },
            },
        ])
        .then((production) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(production);
        })
        .catch((err) => next(err));
};

const createProductionEntry = (req, res) => {
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
};

const deleteProductionEntry = (req, res) => {
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
};

module.exports = {
    getProduction,
    getProductionSummary,
    createProductionEntry,
    deleteProductionEntry,
};
