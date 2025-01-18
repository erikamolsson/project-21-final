

import { User } from "../models/userModel";
import { sign } from "jsonwebtoken";

// Skapa JWT-token
const generateToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };
  
  // Registrera användare
  const registerUser = async (req, res) => {
    const { name, alias, email, password, profilePicture } = req.body;
  
    try {
      // Kontrollera om e-post eller alias redan används
      const emailExists = await User.findOne({ email });
      const aliasExists = await User.findOne({ alias });
  
      if (emailExists) {
        return res.status(400).json({ message: "E-postadressen är redan registrerad" });
      }
  
      if (aliasExists) {
        return res.status(400).json({ message: "Aliaset är redan taget" });
      }
  
      // Skapa ny användare
      const user = await User.create({
        name,
        alias,
        email,
        password,
        profilePicture: profilePicture || "https://via.placeholder.com/150",
      });
  
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          alias: user.alias,
          email: user.email,
          profilePicture: user.profilePicture,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: "Ogiltiga användaruppgifter" });
      }
    } catch (error) {
      res.status(500).json({ message: "Serverfel", error: error.message });
    }
  };
  
  // Logga in användare
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          alias: user.alias,
          email: user.email,
          profilePicture: user.profilePicture,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Felaktiga uppgifter" });
      }
    } catch (error) {
      res.status(500).json({ message: "Serverfel", error: error.message });
    }
  };
  
  // Hämta användarprofil
  const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          alias: user.alias,
          email: user.email,
          profilePicture: user.profilePicture,
        });
      } else {
        res.status(404).json({ message: "Couldn't find user!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  };
  
  export default { registerUser, loginUser, getProfile };
