const express = require("express");
const app = express();
const ErrorHandler = require("./utils/errorHandler.js");
//
app.use(express.json());
// routes imports
// user route
const user = require("./routes/userRoute.js");
app.use("/api/v1/",user);
// product route
const product = require("./routes/productRoute");
app.use("/api/v1/",product);
// middleware for error
app.use(ErrorHandler);

module.exports = app;