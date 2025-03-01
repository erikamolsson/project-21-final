import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();


// Skapa JWT-token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

  
const registerUser = async (req, res) => {

  try {
    console.log("Incoming Request Body:", req.body);
    const { name, alias, email, password } = req.body;
    // Check if email or alias already exists
    const existingAlias = await User.findOne({ alias });
    const existingEmail = await User.findOne({ email });

    if (existingAlias) {
      return res.status(400).json({ message: "Alias is already taken" });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      alias,
      email,
      password: hashedPassword,
    });

    console.log("Created User:", user);

    res.status(201).json({
      id: user._id,
      name: user.name,
      alias: user.alias,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { alias, password } = req.body;

  try {
    const user = await User.findOne({ alias });

    console.log("Stored password:", user ? user.password : "No user found");

    if (user && bcrypt.compare(password, user.password)) {

      // ✅ Generate JWT token using user ID, generated the wrong token..
      const token = jwt.sign(
        { id: user._id }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "7d" } // Expiration time
      );

      res.json({
        id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get user profile
const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};


const getUserID = async (req, res) => {
  console.log("🔎 Backend received request for user:", req.params.id);

  try {
    const user = await User.findById(req.params.id);
    console.log("Found User:", user);

    if (!user) {
      console.warn("User not found!");
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find().select("-password"); // Exclude passwords for security

    // Return the users as an array
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export default { 
  registerUser, 
  loginUser, 
  getProfile, 
  getUserID, 
  getAllUsers 
};
