const express = require("express");
const productionEntry = require("../models/productionEntry");

const productionRouter = express.Router();

const {
    getEmployeeProductionReport,
    createProductionEntry,
    deleteProductionEntry,
    getTeamProductionReport,
} = require("../controllers/productionController");

productionRouter.get("/employeeProductionReport", getEmployeeProductionReport);

productionRouter.get("/teamProductionReport", getTeamProductionReport);

productionRouter.post("/", createProductionEntry);

productionRouter.delete("/", deleteProductionEntry);

module.exports = productionRouter;
