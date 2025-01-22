import { User } from "../models/userModel";
/* import jwt from "jsonwebtoken"; */
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();


// Skapa JWT-token
/* const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}; */

  
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
   /*  if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    } */
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
        token: generateToken(user._id),
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
  try {
    console.log("Fetching user with ID:", req.params.id);
    const user = await User.findById(req.params.id);
    console.log("Found User:", user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export default { registerUser, loginUser, getProfile, getUserID };
