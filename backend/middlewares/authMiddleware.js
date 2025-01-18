import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Ej auktoriserad" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Ingen token funnen" });
  }
};


