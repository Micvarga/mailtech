const express = require("express");
const authenticate = require("../authenticate");

const volumeRouter = express.Router();

const {
    getDailyVolumeReport,
    getDailyRevenueReport,
    getRevenueByTaskReport,
} = require("../controllers/volume_RevenueController");

volumeRouter.get(
    "/dailyVolumesReport",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    getDailyVolumeReport
);

volumeRouter.get(
    "/dailyRevenueReport",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    getDailyRevenueReport
);

volumeRouter.get(
    "/revenueByTaskReport",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    getRevenueByTaskReport
);

module.exports = volumeRouter;
