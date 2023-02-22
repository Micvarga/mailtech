const express = require("express");

const volumeRouter = express.Router();

const { getVolumes } = require("../controllers/volumeController");

volumeRouter.get("/", getVolumes);

module.exports = volumeRouter;
