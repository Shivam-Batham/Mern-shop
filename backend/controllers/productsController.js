const { json } = require("stream/consumers");
const Product = require("../models/productModel.js");

//create product -- Admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
// update product --admin
exports.updateProduct = async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    // if product not found
    if(!product){
      return res.status(500).json({
        success : failed,
        message:"product not found"
      })
    }
    // if product found
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    });
    //update status
    res.status(200).json({
      success:true,
      message:"updated successfully",
      product
    })
}
// get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    });
};
// delete product
exports.deleteProduct = async (req, res, next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return res.status(500).json({
      success : failed,
      message:"product not found"
    })
  }
  await product.deleteOne();
  res.status(200).json({
    success : true,
    message:"product deleted successfully",
  })
} 
// find one product
exports.getProductDetails = async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return res.status(500).json({
      success : false,
      message:"product not found",
    })
  }
  res.status(200).json({
    success : true,
    message:"product not found",
    product
  })
}
