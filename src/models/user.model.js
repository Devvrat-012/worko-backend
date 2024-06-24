import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
);

const User = mongoose.model("User", userSchema);

export default User;
