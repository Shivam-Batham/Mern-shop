const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");

// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sampleUrl",
    },
  });
  sendToken(user,201,res);

  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   // user,
  //   token, //for cookie
  // });
});

// login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // check if user has given password & email both
  if (!email || !password) {
    return next(new ErrorHandler(`please enter email & password`));
  }
  //find user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(`please enter email or password`,401));
  }

  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(`please enter email or password`,401));
  }
  sendToken(user,200,res);
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   // user,
  //   token, //for cookie
  // });
});

// logout user
exports.logout = catchAsyncError(async (req,res,next)=>{

  res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({
    success: true,
    message:"Logget out",
  });
})