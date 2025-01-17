import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db";
import { challengeRoutes } from "./routes/challengeRoutes";
/* import dotenv from "dotenv"; */
import userRoutes from "./routes/userRoutes.js";



/* dotenv.config(); */
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

// Connect to MongoDB
connectDB();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Route getChallenges
app.use("/api/challenges", challengeRoutes);

// Reg users
app.use("/api/users", userRoutes);


// Routes > start Homepage All
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
