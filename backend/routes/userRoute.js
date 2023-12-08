const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  getAllUsers,
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserDatails,
  updateUserPassword,
  updateUserProfile,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDatails);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router
  .route("/admin/user")
  .get(isAuthenticatedUser, autherizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, autherizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, autherizeRoles("admin"),updateUserRole)
  .delete(isAuthenticatedUser, autherizeRoles("admin"),deleteUser);
module.exports = router;
