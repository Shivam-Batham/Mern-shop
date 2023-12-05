const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err,req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong monogdb id err
    if(err.name === "casterror"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    console.log(err.statusCodes);
    res.status(err.statusCode).json({
        success : false,
        message:err.message,
        //  error:err.stack     // it return whole stack
    });
};