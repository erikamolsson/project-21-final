import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { User } from "../models/userModel.js";


const router = Router();
const { loginUser, getProfile, getUserID, getAllUsers } = userController;


// Route POST to register a new user
router.post("/register", async (req, res) => {
  // Skapa JWT-token
  const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };

  

  try {
    console.log("Incoming Request Body:", req.body);
    const { name, alias, email, password } = req.body;
    // Check if email or alias already exists
    console.log("Checking for existing alias...");
    const existingAlias = await User.findOne({ alias });
    console.log("Existing Alias Check Complete:", existingAlias);

    console.log("Checking for existing email...");
    const existingEmail = await User.findOne({ email });
    console.log("Existing Email Check Complete:", existingEmail);

    if (existingAlias) {
      console.log("Alias already taken");
      return res.status(400).json({ message: "Alias is already taken" });
    }

    if (existingEmail) {
      console.log("Email already registered");
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

    
    if (user) {
      const responseData = {
        id: user._id,
        name: user.name,
        alias: user.alias,
        email: user.email,
        token: generateToken(user._id),
      };
      console.log("Response Data:", responseData);

      res.status(201).json(responseData);
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error in backend", error: error.message });
  }

});


// Get all users (optional: protected route)
router.get("/all-users", protect, getAllUsers);

// Route to log in a user
router.post("/login", loginUser);

// Route to get the logged-in user's profile (protected route)
router.get("/profile", protect, getProfile);

// GET request data by ID
router.get("/:id", protect, getUserID);


export default router;
