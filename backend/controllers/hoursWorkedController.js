const hoursWorkedEntry = require("../models/hoursWorked");

const getEmployeeHoursWorkedReport = (req, res, next) => {
    // variables for differnt form fields sent from client
    let username = req.body.username;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    hoursWorkedEntry
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
                $group: {
                    _id: "$username",
                    breakdown: {
                        $push: {
                            username: "$username",
                            date: "$date",
                            hoursWorked: "$hoursWorked",
                        },
                    },
                    total_hours_worked: {
                        $sum: "$hoursWorked",
                    },
                },
            },
        ])
        // returned promise with query results if no result error is thrown
        .then((hoursWorked) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(hoursWorked);
        })
        .catch((err) => next(err));
};

const getTeamHoursWorkedReport = (req, res, next) => {
    // variables for differnt form fields sent from client
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    hoursWorkedEntry
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
                $group: {
                    _id: "$date",
                    entries: {
                        $push: {
                            date: "$date",
                            username: "$username",
                            hoursWorked: "$hoursWorked",
                        },
                    },
                    total_hours_worked: {
                        $sum: "$hoursWorked",
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ])
        // returned promise with query results if no result error is thrown
        .then((hoursWorked) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(hoursWorked);
        })
        .catch((err) => next(err));
};

const getDailyLaborReport = (req, res, next) => {
    // variables for differnt form fields sent from client
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    hoursWorkedEntry
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
                $lookup: {
                    from: "users",
                    localField: "username",
                    foreignField: "username",
                    as: "userPayRate",
                },
            },
            {
                $unset: [
                    "userPayRate.firstName",
                    "userPayRate.lastName",
                    "userPayRate.admin",
                    "userPayRate.salt",
                    "userPayRate.hash",
                    "userPayRate.__v",
                    "userPayRate._id",
                ],
            },
            {
                $unwind: {
                    path: "$userPayRate",
                },
            },
            {
                $group: {
                    _id: "$date",
                    labor: {
                        $push: {
                            username: "$username",
                            hoursWorked: "$hoursWorked",
                            pay: "$userPayRate.pay",
                            laborCost: {
                                $multiply: ["$hoursWorked", "$userPayRate.pay"],
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    totalLaborCost: {
                        $sum: "$labor.laborCost",
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ])
        // returned promise with query results if no result error is thrown
        .then((hoursWorked) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(hoursWorked);
        })
        .catch((err) => next(err));
};

const addHoursWorked = (req, res, next) => {
    hoursWorkedEntry
        // findOne query will look for matches on username and date
        .findOne({ username: req.body.username, date: req.body.date })
        // docExists is a returned promise variable with results from findOne
        .then((docExists) => {
            // if a match was found form query then error is thrown
            if (docExists) {
                const err = new Error(
                    `A worked hours entry for ${req.body.username} on ${req.body.date} already exists!`
                );
                err.status = 403;
                return next(err);
            } else {
                // if no match was found then a new document is created
                hoursWorkedEntry
                    .create({
                        username: req.body.username,
                        date: req.body.date,
                        hoursWorked: req.body.hoursWorked,
                    })
                    // entry is a promise variable with the data from the document being created.
                    .then((entry) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        // returns confirmmation message and copy of hours worked entry made
                        res.json({
                            status: "Worked Hours entry Successful!",
                            entry: entry,
                        });
                    })
                    // executs err from document creation
                    .catch((err) => next(err));
            }
        })
        // executes err from existing entry search
        .catch((err) => next(err));
};

const deleteHoursWorked = (req, res, next) => {
    hoursWorkedEntry
        // query to find entry by _id and delete.
        .findByIdAndDelete(req.body._id)
        .then((hoursWorked) => {
            // If _id match was not found an error is thrown. Else success message is given and entry is deleted.
            if (!hoursWorked) {
                const err = new Error("Hours Worked entry does not exisit!");
                err.status = 404;
                return next(err);
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                    status: "Worked Hours entry deleted!",
                    hoursWorked: hoursWorked,
                });
            }
        })
        .catch((err) => next(err));
};

module.exports = {
    getEmployeeHoursWorkedReport,
    getTeamHoursWorkedReport,
    getDailyLaborReport,
    addHoursWorked,
    deleteHoursWorked,
};
