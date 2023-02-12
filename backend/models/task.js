const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const taskSchema = new Schema({
    name: String,
    rate: Number,
    price: Currency,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
