const express = require("express");
const authenticate = require("../authenticate");

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
    authenticate.verifyUser,
    getEmployeeHoursWorkedReport
);

hoursWorkedRouter.get(
    "/teamHoursWorkedReport",
    authenticate.verifyUser,
    getTeamHoursWorkedReport
);

hoursWorkedRouter.get(
    "/dailyLaborReport",
    authenticate.verifyUser,
    getDailyLaborReport
);

hoursWorkedRouter.post("/", authenticate.verifyUser, addHoursWorked);
hoursWorkedRouter.delete("/", authenticate.verifyUser, deleteHoursWorked);

module.exports = hoursWorkedRouter;
