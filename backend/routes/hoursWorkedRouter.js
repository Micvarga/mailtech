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
    authenticate.verifyAdmin,
    getTeamHoursWorkedReport
);

hoursWorkedRouter.get(
    "/dailyLaborReport",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    getDailyLaborReport
);

hoursWorkedRouter.post(
    "/",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    addHoursWorked
);
hoursWorkedRouter.delete(
    "/",
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    deleteHoursWorked
);

module.exports = hoursWorkedRouter;
