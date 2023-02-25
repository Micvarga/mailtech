const productionVolume = require("../models/productionEntry");

const getDailyVolumeReport = (req, res, next) => {
    // variables to hold client request form info.
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    productionVolume
        // mongodb query to colelct and sort daily volume data.
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
                    dailyVolumes: {
                        $push: {
                            task: "$production.task",
                            volumes: "$production.volume",
                        },
                    },
                },
            },
        ])
        .then((volumes) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(volumes);
        })
        .catch((err) => next(err));
};

const getDailyRevenueReport = (req, res, next) => {
    // variables to hold client request form info.
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    productionVolume
        // mongodb query to collect and calculate daily revenue data.
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
                $lookup: {
                    from: "tasks",
                    localField: "production.task",
                    foreignField: "task",
                    as: "taskInfo",
                },
            },
            {
                $unwind: {
                    path: "$taskInfo",
                },
            },
            {
                $group: {
                    _id: "$date",
                    entries: {
                        $push: {
                            task: "$production.task",
                            volume: "$production.volume",
                            price: "$taskInfo.price",
                            revenue: {
                                $multiply: [
                                    "$production.volume",
                                    "$taskInfo.price",
                                ],
                            },
                        },
                    },
                    totalRevenue: {
                        $sum: {
                            $multiply: [
                                "$production.volume",
                                "$taskInfo.price",
                            ],
                        },
                    },
                },
            },
        ])
        .then((revenue) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(revenue);
        })
        .catch((err) => next(err));
};

const getRevenueByTaskReport = (req, res, next) => {
    // variables to hold client request info data.
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    productionVolume
        // mongodb query to collect and caluclate revenue data by task
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
                $lookup: {
                    from: "tasks",
                    localField: "production.task",
                    foreignField: "task",
                    as: "taskInfo",
                },
            },
            {
                $unwind: {
                    path: "$taskInfo",
                },
            },
            {
                $group: {
                    _id: "$production.task",
                    entries: {
                        $push: {
                            date: "$date",
                            task: "$production.task",
                            volume: "$production.volume",
                            price: "$taskInfo.price",
                            revenue: {
                                $multiply: [
                                    "$production.volume",
                                    "$taskInfo.price",
                                ],
                            },
                        },
                    },
                    totalRevenue: {
                        $sum: {
                            $multiply: [
                                "$production.volume",
                                "$taskInfo.price",
                            ],
                        },
                    },
                },
            },
        ])
        .then((revenue) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(revenue);
        })
        .catch((err) => next(err));
};

module.exports = {
    getDailyVolumeReport,
    getDailyRevenueReport,
    getRevenueByTaskReport,
};
