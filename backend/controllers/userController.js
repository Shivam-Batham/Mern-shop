const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail =  require("../utils/sendEmail.js");
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
// forget password
exports.forgetPassword = catchAsyncError(async(req,res,next)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("User not Found",404));
  }
  // get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  // creating reset link
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message = `your password reset token is :\n\n
  ${resetPasswordUrl}\n\n if you have not requested this email then, Please ignore this`;
  try{
    await sendEmail({
      email:user.email,
      subject:`Mern Shop password recovery`,
      message,
    });
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} succesfully`,
    });
  }catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave:false});
    return next(ErrorHandler(error.message,500));
  }
})