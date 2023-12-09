const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");
const {
  getSingleOrder,
  myOrders,
  newOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, autherizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, autherizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, autherizeRoles("admin"), deleteOrder);

module.exports = router;
