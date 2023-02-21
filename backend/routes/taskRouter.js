const express = require("express");
const Task = require("../models/task");

const taskRouter = express.Router();

const { getTasks, addTask } = require("../controllers/taskController");

taskRouter.get("/", getTasks);

taskRouter.post("/", addTask);

module.exports = taskRouter;
