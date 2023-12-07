const express = require("express");
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails } = require("../controllers/productsController");
const { isAuthenticatedUser,autherizeRoles } = require("../middleware/auth");
const router = express.Router();

// routes
router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,autherizeRoles("admin"),createProduct);
router.route("/product/:id").put(isAuthenticatedUser,autherizeRoles("admin"),updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser,autherizeRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);


module.exports = router; 