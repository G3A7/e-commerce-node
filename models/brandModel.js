const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand Required"],
      unique: [true, "brand Unique"],
      minlength: [3, "brand Minlength 3"],
      maxlength: [32, "brand Maxlength 32"],
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

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
