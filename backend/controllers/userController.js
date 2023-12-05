const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/userModel.js");

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

  res.status(201).json({
    success: true,
    user,
  });
});
