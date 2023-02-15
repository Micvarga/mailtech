const express = require("express");
const productionEntry = require("../models/productionEntry");

const productionRouter = express.Router();

const {
    getProduction,
    getProductionSummary,
    getTeamProductionSummary,
    createProductionEntry,
    deleteProductionEntry,
} = require("../controllers/productionController");

productionRouter.get("/", getProduction);
productionRouter.get("/employeeSummary", getProductionSummary);
productionRouter.get("/teamSummary", getTeamProductionSummary);

productionRouter.post("/", createProductionEntry);

productionRouter.delete("/", deleteProductionEntry);

module.exports = productionRouter;
