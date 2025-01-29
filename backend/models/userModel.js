import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";



const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  alias: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true,
    select: false
  },
  token: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});


// Middleware: crypt befor storing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// verify password

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword);
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export {User};

