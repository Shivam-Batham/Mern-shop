const express = require("express");
const { getAllProducts } = require("../controllers/productsController");
const router = express.Router();

// routes
router.route("/products").get(getAllProducts);

module.exports = router;