const express = require("express");

const volumeRouter = express.Router();

const {
    getDailyVolumeReport,
    getDailyRevenueReport,
    getRevenueByTaskReport,
} = require("../controllers/volume_RevenueController");

volumeRouter.get("/dailyVolumesReport", getDailyVolumeReport);
volumeRouter.get("/dailyRevenueReport", getDailyRevenueReport);
volumeRouter.get("/revenueByTaskReport", getRevenueByTaskReport);

module.exports = volumeRouter;
