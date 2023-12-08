const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err,req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong monogdb id err
    if(err.name === "casterror"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //wrong JWT web token err
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }
    // JWT expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json web token is Expired, try again`;
        err = new ErrorHandler(message,400);
    }
    // duplicate mogngoDB error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keyValue} entered`;
        err = new ErrorHandler(message,400);
    }
    console.log(err.statusCodes);
    res.status(err.statusCode).json({
        success : false,
        message:err.message,
        //  error:err.stack     // it return whole stack
    });
};