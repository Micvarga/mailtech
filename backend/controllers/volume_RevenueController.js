const productionVolume = require("../models/productionEntry");

const getVolumes = (req, res, next) => {
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
    productionVolume
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
                        // volumeReport is an array containing all the production info for each date.
                        volumeReport: {
                            $push: {
                                task: "$production.task",
                                volume: "$production.volume",
                            },
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

module.exports = { getVolumes };
