const express = require("express")
const router = express.Router()
const { isAuthenticatedUser,autherizeRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser,createOrder)

module.exports=router;