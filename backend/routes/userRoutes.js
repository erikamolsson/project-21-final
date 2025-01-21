import { Router } from "express";
import userController from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";



const router = Router();
const { registerUser, loginUser, getProfile, getUserID } = userController;


// Route POST to register a new user
router.post("/register", (req, res) => {
  const { name, alias, email, password } = req.body;

  try {
    const result = registerUser({
      name,
      alias,
      email,
      password,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to log in a user
router.post("/login", loginUser);

// Route to get the logged-in user's profile (protected route)
router.get("/profile", protect, getProfile);

// GET request data by ID
router.get("/:id", protect, getUserID);


export default router;

