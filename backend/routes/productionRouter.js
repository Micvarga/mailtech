const express = require("express");
const productionEntry = require("../models/productionEntry");

const productionRouter = express.Router();

const {
    getProduction,
    getProductionSummary,
    createProductionEntry,
    deleteProductionEntry,
} = require("../controllers/productionController");

productionRouter.get("/", getProduction);
productionRouter.get("/employeeSummary", getProductionSummary);

productionRouter.post("/", createProductionEntry);

productionRouter.delete("/", deleteProductionEntry);

module.exports = productionRouter;
