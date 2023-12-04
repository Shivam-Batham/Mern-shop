const express = require("express");
const app = express();
const ErrorHandler = require("./utils/errorHandler.js");
//
app.use(express.json());
// routes imports
const product = require("./routes/productRoute");
app.use("/api/v1/",product);
// middleware for error
app.use(ErrorHandler);

module.exports = app;