const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
exports.isAuthenticatedUser =catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("please Login to Access this resource",401));

    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.autherizeRoles=(...roles)=>{
    return (req,res,next)=>{
        // if user is not admin
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`,403)
           );
        };
        next();
    }
}