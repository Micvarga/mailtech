const express = require("express");
const Task = require("../models/task");

const taskRouter = express.Router();

taskRouter.get("/", (req, res, next) => {
    // query to find all tasks in database.
    Task.find()
        // tasks is promise variable containing query results.
        .then((tasks) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(tasks);
        })
        .catch((err) => next(err));
});

taskRouter.post("/", (req, res, next) => {
    // query create new document in Tasks Collection.
    Task.create(req.body)
        // task is promise variable containing query results.
        .then((task) => {
            console.log("Task Created", task);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(task);
        })
        .catch((err) => next(err));
});

module.exports = taskRouter;
