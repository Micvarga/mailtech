const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const secret = require("./secret");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouter");
const hoursWorkedRouter = require("./routes/hoursWorkedRouter");
const taskRouter = require("./routes/taskRouter");
const productionRouter = require("./routes/productionRouter");

const mongoose = require("mongoose");

// Mongodb connnection and verification.
const url = secret.mongoUrl;
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connect.then(
    () => console.log("Connected correctly to server"),
    (err) => console.log(err)
);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        name: "session-id",
        secret: secret.secretKey,
        saveUninitialized: false,
        resave: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hoursWorked", hoursWorkedRouter);
app.use("/tasks", taskRouter);
app.use("/production", productionRouter);

app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
