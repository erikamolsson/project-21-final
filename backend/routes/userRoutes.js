import { Router } from "express";
import userController from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Middleware to protect routes

const router = Router();
const { registerUser, loginUser, getProfile } = userController;

// Route to register a new user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

// Route to get the logged-in user's profile (protected route)
router.get("/profile", protect, getProfile);

export default router;
