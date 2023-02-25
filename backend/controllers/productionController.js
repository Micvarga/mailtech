const productionEntry = require("../models/productionEntry");

const getEmployeeProductionReport = (req, res, next) => {
    // variables to hold client request form info.
    let username = req.body.username;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    productionEntry
        // mongodb query to collect and sort employee production data.
        .aggregate([
            {
                $match: {
                    username: { $eq: username },
                },
            },
            {
                $match: {
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
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
                    _id: "$username",
                    breakdown: {
                        $push: {
                            username: "$username",
                            date: "$date",
                            task: "$production.task",
                            volume: "$production.volume",
                        },
                    },
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

const getTeamProductionReport = (req, res, next) => {
    // variables to hold client request form info.
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    productionEntry
        // mongodb query to collect and sort team production data.
        .aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
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
                    _id: "$date",
                    entries: {
                        $push: {
                            date: "$date",
                            username: "$username",
                            task: "$production.task",
                            volume: "$production.volume",
                            credit: "$production.credit",
                        },
                    },
                    totalVolume: {
                        $sum: "$production.volume",
                    },
                    totalCredit: {
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
    getEmployeeProductionReport,
    getTeamProductionReport,
    createProductionEntry,
    deleteProductionEntry,
};
