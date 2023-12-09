const express = require("express");
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productsController");
const { isAuthenticatedUser,autherizeRoles } = require("../middleware/auth");
const router = express.Router();

// routes
router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,autherizeRoles("admin"),createProduct);
router.route("/product/:id").put(isAuthenticatedUser,autherizeRoles("admin"),updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser,autherizeRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);


module.exports = router; 