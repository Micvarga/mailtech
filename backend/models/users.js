const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // this will keep users from getting admin status by default
    admin: {
        type: Boolean,
        default: false,
    },
});

// this will pull employeeId and password infor from mongodb
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
