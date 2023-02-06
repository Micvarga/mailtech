const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const earnedHoursSchema = new Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: Date,
    hoursWorked: String,
});

const EarnedHours = mongoose.model("EarnedHours", earnedHoursSchema);

module.exports = EarnedHours;
