const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const isAuthenticated = require("../middleware/isAuth");

router.post("/api/v1/register", userController.registerUser);
router.post("/api/v1/login", userController.loginUser);
router.get("/api/v1/profile", isAuthenticated, userController.profile);

module.exports = router;
