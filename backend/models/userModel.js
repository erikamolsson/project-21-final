import mongoose from "mongoose";
import bcrypt from "bcrypt";





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
    required: true 
  },
  profileImage: { 
    type: String,
    default: "https://via.placeholder.com/150",  
  },
});


// Middleware: crypt befor storing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// verify password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);