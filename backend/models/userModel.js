import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: Buffer },
});

export const User = mongoose.model("User", userSchema);