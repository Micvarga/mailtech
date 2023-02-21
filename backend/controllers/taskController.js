const { modelName } = require("../models/task");
const task = require("../models/task");

const getTasks = (req, res, next) => {
    // query to find all tasks in database.
    task.find()
        // tasks is promise variable containing query results.
        .then((tasks) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(tasks);
        })
        .catch((err) => next(err));
};

const addTask = (req, res, next) => {
    // query create new document in Tasks Collection.
    task.create(req.body)
        // task is promise variable containing query results.
        .then((task) => {
            console.log("Task Created", task);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(task);
        })
        .catch((err) => next(err));
};

module.exports = { getTasks, addTask };
