import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    }
  },
  { timestamps: true }
);

// Export as default
const User = mongoose.model("User", userSchema);
export default User;
