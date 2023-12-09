const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail =  require("../utils/sendEmail.js");
const crypto =  require("crypto");
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
  // if user not found
  if (!user) { 
    return next(new ErrorHandler(`please enter email or password`,401));
  }

  const isPasswordMatched = user.comparePassword(password);
  // if password not matched
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
  // if any error comes
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
    
    return next(new ErrorHandler(error.message,500));
  }
})

// Reset password
exports.resetPassword = catchAsyncError(async (req,res,next)=>{
  // creating token hash  
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt : Date.now()}
  });
  if(!user){
    return next(new ErrorHandler("reset password token is invalid or has been expired",404));
  }
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("reset password token is invalid or has been expired",404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire=undefined;
  await user.save();
  sendToken(user,200,res);
})

// get user details
exports.getUserDatails = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  })

})
// update user password
exports.updateUserPassword = catchAsyncError(async (req,res,next)=>{
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(`old password is incorrect`,400));
  }
  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler(`password does matched`,400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user,200,res);

})
// update user profile
exports.updateUserProfile = catchAsyncError(async (req,res,next)=>{
  const newUserData = {
    name : req.body.name,
    email: req.body.email,
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new : true,
    runValidators:true,
    userFindAndModify:false
  });
  // we will add cloudinary later

  res.status(200).json({
    success:true,

  })
})
// get all users -- admin
exports.getAllUsers = catchAsyncError(async (req,res,next)=>{

  const users = await User.find();

  res.status(200).json({
    success:true,

  })
});
// get single user -- admin
exports.getSingleUser = catchAsyncError(async (req,res,next)=>{

  const users = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User does not exist with this id ${req.params.id}`,400));

  }
  res.status(200).json({
    success:true,

  })
});

// update user role -- admin
exports.updateUserRole = catchAsyncError(async (req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }
  const user  = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    userFindAndModify:false,
  });
  res.status(200).json({
    success:true,

  })
})
// delete user --admin
exports.deleteUser = catchAsyncError(async (req,res,next)=>{
  
  const user  = await User.findByIdAndUpdate(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User does not exist with this id ${req.params.id}`,400));
  }
  await user.remove();
  res.status(200).json({
    success:true,
    message:"User deleted successfully",
  });
})

