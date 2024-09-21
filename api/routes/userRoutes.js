const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/api/v1/register", userController.registerUser);
router.post("/api/v1/login", userController.loginUser);

module.exports = router;
