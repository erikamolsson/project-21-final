import express from "express";
import cors from "cors";
import mongoose from "mongoose";
/* import { connectDB } from "./config/db"; */
import challengeRoutes from "./routes/challengeRoutes";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import expressListEndpoints from "express-list-endpoints";


// .env file
dotenv.config();

// Connect to MongoDB
/* connectDB(); */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
// start Homepage All
app.get("/", (req, res) => {

  const endpoints = expressListEndpoints(app);
  res.json({
    message: "Here are the available endpoints:",
    endpoints: endpoints
  });
});

// Reg users
app.use("/api/users", userRoutes);

// getChallenges
app.use("/api/challenges", challengeRoutes);

// Serve static files from the `uploads` directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
