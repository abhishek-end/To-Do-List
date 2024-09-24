const asyncHandler = require("express-async-handler");
const CategoryModel = require("../model/category");

const categoryController = {
  createList: asyncHandler(async (req, res) => {
    const { title, description, Date } = req.body;
    if (!title || !description || !Date) {
      throw new Error("Title Description and Date is required");
    }

    const createList = await CategoryModel.create({
      title,
      description,
      Date,
      user: req.user,
    });

    res.status(201).json({ message: "List Created", createList });
  }),
  getlists: asyncHandler(async (req, res) => {
    const category = await CategoryModel.find({ user: req.user });
    if (!category) {
      throw new Error("No Task Found for this user");
    }
    res.status(201).json({ message: "Success Get list", category });
  }),
  update: asyncHandler(async (req, res) => {
    const task = await CategoryModel.findByIdAndUpdate(req.params.id);
    console.log(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.done = req.body.done || false;
    await task.save();

    res.status(201).json({ message: "Task Update Successfully", task });
  }),
  delete: asyncHandler(async (req, res) => {
    console.log(req.user);
    const deleteBy = await CategoryModel.findOneAndDelete(req.params.id);
    console.log(deleteBy);

    res.status(201).json({ message: "Task Delete Successfully", deleteBy });
  }),
};

module.exports = categoryController;
