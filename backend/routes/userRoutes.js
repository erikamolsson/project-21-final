import { Router } from "express";
import userController from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Middleware to protect routes
/* import multer from "multer";
import path from "path"; */


const router = Router();
const { registerUser, loginUser, getProfile } = userController;


/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));// Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
const upload = multer({ storage }); */


// Route to register a new user
router.post("/register", /* upload.single("profileImage"), */ (req, res) => {

    // Modify the `registerUser` function to accept file data
    const { name, alias, email, password } = req.body;
    /* const profileImage = req.file ? `/uploads/${req.file.filename}` : null; */
  
    // Pass modified data to your controller or write logic here
    try {
      const result = registerUser({
        name,
        alias,
        email,
        password,
        /* profileImage, */
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

export default router;
