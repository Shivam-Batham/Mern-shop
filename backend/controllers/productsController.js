const { json } = require("stream/consumers");
const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

//create product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// update product --admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  // if product not found normal approach
  // if (!product) {
  //   return res.status(500).json({
  //     success: failed,
  //     message: "product not found",
  //   });
  // }

  // if product not found middleware approach

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  // if product found
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  //update status
  res.status(200).json({
    success: true,
    message: "updated successfully",
    product,
  });
});
// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeaure = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeaure.query;
  if (!products) {
    return next(new ErrorHandler("products not found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount
  });
});
// delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
// find one product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "product not found",
    product,
  });
});
