const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category Unique"],
      minlength: [3, "Category Minlength 3"],
      maxlength: [32, "Category Maxlength 32"],
    },
    // A and B ==> a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image:String
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
