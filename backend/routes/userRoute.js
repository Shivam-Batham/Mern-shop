const express = require("express")
const router = require("router");
const { registerUser } = require("../controllers/userController");

router.route("/register").post(registerUser)

module.exports = router;