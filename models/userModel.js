const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "please enter a email"],
      unique: true,
      // lowercase: true,
    },
   changePasswordTime:Date,
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "please enter a password"],
      minlength: [6, "too Short Password"],
    },
    rule: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
