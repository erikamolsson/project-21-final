import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("Authorization Header:", req.headers.authorization);

      // Extract token
      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded:", decoded);
      // Get user from token
      const user = decoded;
      req.user = user;
      console.log("User:", user);
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({ message: "Not authorised." });
    }
  }

  if (!token) {
    console.error("No token found in headers");
    res.status(401).json({ message: "No token found..." });
  }
};