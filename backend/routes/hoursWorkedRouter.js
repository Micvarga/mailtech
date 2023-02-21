const express = require("express");
const hoursWorked = require("../models/hoursWorked");

const hoursWorkedRouter = express.Router();

const {
    getHoursWorked,
    addHoursWorked,
    deleteHoursWorked,
} = require("../controllers/hoursWorkedController");

hoursWorkedRouter.get("/", getHoursWorked);
hoursWorkedRouter.post("/", addHoursWorked);
hoursWorkedRouter.delete("/", deleteHoursWorked);

module.exports = hoursWorkedRouter;
