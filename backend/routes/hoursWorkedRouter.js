const express = require("express");
const hoursWorked = require("../models/hoursWorked");

const hoursWorkedRouter = express.Router();

const {
    addHoursWorked,
    deleteHoursWorked,
    getEmployeeHoursWorkedReport,
    getTeamHoursWorkedReport,
    getDailyLaborReport,
} = require("../controllers/hoursWorkedController");

hoursWorkedRouter.get(
    "/employeeHoursWorkedReport",
    getEmployeeHoursWorkedReport
);

hoursWorkedRouter.get("/teamHoursWorkedReport", getTeamHoursWorkedReport);

hoursWorkedRouter.get("/dailyLaborReport", getDailyLaborReport);

hoursWorkedRouter.post("/", addHoursWorked);
hoursWorkedRouter.delete("/", deleteHoursWorked);

module.exports = hoursWorkedRouter;
