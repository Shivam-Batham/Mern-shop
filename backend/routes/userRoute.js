const express = require("express");
const router = express.Router();
const { registerUser,loginUser, logout, forgetPassword } = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/logout").get(logout);
module.exports = router; 