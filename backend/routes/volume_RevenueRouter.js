const express = require("express");

const volumeRouter = express.Router();

const { getVolumes } = require("../controllers/volume_RevenueController");

volumeRouter.get("/", getVolumes);

module.exports = volumeRouter;
