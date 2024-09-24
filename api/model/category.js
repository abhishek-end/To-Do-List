const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    Date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the model
const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
