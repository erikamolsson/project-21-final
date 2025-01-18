import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import challengeRoutes from "./routes/challengeRoutes";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";


// .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 7777;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Reg users
app.use("/api/users", userRoutes);

// getChallenges
app.use("/api/challenges", challengeRoutes);


// start Homepage All
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
