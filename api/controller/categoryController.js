const asyncHandler = require("express-async-handler");
const CategoryModel = require("../model/category");

const categoryController = {
  //!CreateList
  createList: asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new Error("Unauthorized Can-not crate list");
    }
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      throw new Error("Title Description and Date is required");
    }
    const existing = await CategoryModel.findOne({
      title,
      user: req.user,
    });
    // console.log({ user: req.user }, "CREATELIST");

    if (existing) {
      throw new Error("Category already Exist");
    }
    const createList = await CategoryModel.create({
      title,
      description,
      date,
      user: req.user,
    });

    res.status(201).json({ message: "List Created", createList });
  }),
  //!getLists

  getlists: asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new Error("Unauthorized Can-not get lists");
    }
    const category = await CategoryModel.find({ user: req.user });

    if (!category) {
      throw new Error("No Task Found for this user");
    }
    res.status(201).json({ message: "Success Get list", category });
  }),
  //update true or false for (complete and complete task button)
  update: asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const task = await CategoryModel.findByIdAndUpdate(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.done = req.body.done || false;
    await task.save();
    res.status(201).json({ message: "Task Update Successfully", task });
  }),
  //?? delete button
  delete: asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    const userId = req.user;
    const dataId = req.params.id;
    // console.log(userId, "userLog", dataId, "data");

    const deleteBy = await CategoryModel.findOneAndDelete({
      _id: dataId,
      user: userId,
    });

    console.log(dataId, "= dataID", userId, "-", "user");

    res.status(201).json({ message: "Task Delete Successfully", deleteBy });
  }),
};

module.exports = categoryController;
