const express = require("express");
const router = express.Router();
const { registerUser,loginUser, logout, forgetPassword, resetPassword, getUserDatails } = require("../controllers/userController");
const { isAuthenticatedUser,autherizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDatails);
module.exports = router; 