import express from "express";
import { registerUser } from "../controllers/userController.js";


const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

export const router = express.Router();

// POST /api/users/register - new user
router.post("/register", registerUser);

// POST /api/users/login - sign in
router.post("/login", loginUser);

// GET /api/users/profile - get profile
router.get("/profile", protect, getProfile);

module.exports = router;

