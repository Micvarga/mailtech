const express = require("express");
const authenticate = require("../authenticate");

const taskRouter = express.Router();

const { getTasks, addTask } = require("../controllers/taskController");

taskRouter.get("/", authenticate.verifyUser, getTasks);

taskRouter.post("/", authenticate.verifyUser, addTask);

module.exports = taskRouter;
