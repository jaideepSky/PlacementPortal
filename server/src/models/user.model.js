import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required:true
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      required: true,
      default: "student",
    },
  },
  { timestamps: true }
);

const User =  mongoose.model("User", userSchema);
export default User;
