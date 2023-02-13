const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productionEntrySchema = new Schema({
    username: String,
    date: Date,
    production: { type: Array, default: [] },
});

const productionEntry = mongoose.model(
    "productionEntry",
    productionEntrySchema
);

module.exports = productionEntry;
