// import module/package
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes");
const app = express();
// setting middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// setting error path
// app.use((req, res, next) => {
//     const err = new Error(`${req.url} not found in this server`);
//     err.status = 404;
//     next(err);
// });
// // setting another error program
// app.use((err, req, res, next) => {
//     res.status(err.status || 500).json({ error: err.message });
// });
app.use("/user", userRoute);
// export app
module.exports = app;