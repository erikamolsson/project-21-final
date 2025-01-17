const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extrahera token
      token = req.headers.authorization.split(" ")[1];

      // Verifiera token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Hämta användare från token
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

module.exports = { protect };
