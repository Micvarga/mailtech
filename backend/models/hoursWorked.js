const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hoursWorkedSchema = new Schema({
    username: String,
    date: Date,
    hoursWorked: Number,
});

const hoursWorked = mongoose.model("hoursWorked", hoursWorkedSchema);

module.exports = hoursWorked;
