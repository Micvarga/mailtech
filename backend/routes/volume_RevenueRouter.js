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
    getDailyVolumeReport
);

volumeRouter.get(
    "/dailyRevenueReport",
    authenticate.verifyUser,
    getDailyRevenueReport
);

volumeRouter.get(
    "/revenueByTaskReport",
    authenticate.verifyUser,
    getRevenueByTaskReport
);

module.exports = volumeRouter;
