import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";

// Multer setup for profile images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const registerUser = async (req, res) => {
  try {
    const { name, alias, password } = req.body;

    // Kontrollera att obligatoriska fält finns
    if (!name || !alias || !password) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    // Kontrollera om alias redan finns
    const existingUser = await User.findOne({ alias });
    if (existingUser) {
      return res.status(400).json({ message: "Alias is already taken" });
    }

    // Hasha lösenord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa ny användare
    const newUser = new User({
      name,
      alias,
      password: hashedPassword,
    });

    // Om det finns en bild, spara den som buffer (kan spara till moln om du vill)
    if (req.file) {
      newUser.profileImage = req.file.buffer; // Spara bild i databasen
    }

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const uploadProfileImage = upload.single("profileImage");
