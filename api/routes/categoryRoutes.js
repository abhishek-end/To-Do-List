const express = require("express");
const isAuthenticated = require("../middleware/isAuth");
const categoryController = require("../controller/categoryController");
const categoryRouter = express.Router();

categoryRouter.post(
  "/api/v1/createlist",
  isAuthenticated,
  categoryController.createList
);
categoryRouter.get(
  "/api/v1/lists",
  isAuthenticated,
  categoryController.getlists
);
categoryRouter.put(
  "/api/v1/task/markDone/:id",
  isAuthenticated,
  categoryController.update
);
categoryRouter.delete(
  "/api/v1/task/delete/:id",
  isAuthenticated,
  categoryController.delete
);
module.exports = categoryRouter;
