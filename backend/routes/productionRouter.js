const express = require("express");
const authenticate = require("../authenticate");

const productionRouter = express.Router();

const {
    getEmployeeProductionReport,
    createProductionEntry,
    deleteProductionEntry,
    getTeamProductionReport,
} = require("../controllers/productionController");

productionRouter.get(
    "/employeeProductionReport",
    authenticate.verifyUser,
    getEmployeeProductionReport
);

productionRouter.get(
    "/teamProductionReport",
    authenticate.verifyUser,
    getTeamProductionReport
);

productionRouter.post("/", authenticate.verifyUser, createProductionEntry);

productionRouter.delete("/", authenticate.verifyUser, deleteProductionEntry);

module.exports = productionRouter;
