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
                // filters documents by specified date range.
                $match: {
                    date: {
                        $gte: new Date(new Date(startDate)),
                        $lte: new Date(new Date(endDate)),
                    },
                },
            },
            {
                // takes production vales out of array and makes individaul documents.
                $unwind: {
                    path: "$production",
                },
            },
            {
                // groups by Task property and gives total sum of volume and credits.
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

const getTeamProductionSummary = (req, res) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    // array holding iterated dates from for loop.
    const dateRange = [];
    // For Loop will iterate each day between startDate and end Date and store in dateRange array.
    for (
        startDate;
        startDate <= endDate;
        startDate.setDate(startDate.getDate() + 1)
    ) {
        dateRange.push(new Date(startDate));
    }
    console.log(dateRange);
    productionEntry
        .aggregate([
            {
                $unwind: {
                    path: "$production",
                },
            },
            {
                // $bucket will group production docs  by date.
                $bucket: {
                    groupBy: "$date",
                    // dateRange variable with array of dates used to set boundries for each bucket.
                    boundaries: dateRange,
                    default: "Other",
                    output: {
                        count: {
                            $sum: 1,
                        },
                        // production is an array containing all the production info for each date.
                        production: {
                            $push: {
                                username: "$username",
                                task: "$production.task",
                                volume: "$production.volume",
                                credit: "$production.credit",
                            },
                        },
                        // sums total credits for each task in the day. Will be used to help determine team efficiency.
                        totalCredits: {
                            $sum: "$production.credit",
                        },
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
    getTeamProductionSummary,
    createProductionEntry,
    deleteProductionEntry,
};
