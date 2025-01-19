import { Router } from "express";
import challenges from "../data/challengesData.json";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();
const userChallenges = {}; 



// POST /api/challenges/start
// Start challenge period for a user
router.post("/start", protect, (req, res) => {
  const { category, time, daysPerWeek, startDate } = req.body;

  if (!category || !time || !daysPerWeek || !startDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Calculate total days based on the selected period
  const totalDays =
    time === "One week"
      ? 7
      : time === "Three weeks"
      ? 21
      : time === "One month"
      ? 30
      : time === "Three months"
      ? 90
      : 7; // Default to one week

  // Filter challenges by category
  const filteredChallenges =
    category !== "chooseForMe"
      ? challenges.filter((challenge) => challenge.category === category)
      : challenges;

  // Shuffle challenges for randomness
  const shuffledChallenges = filteredChallenges.sort(() => 0.5 - Math.random());

  // Schedule challenges based on days per week
  const schedule = [];
  let dayOffset = 0;

  for (let i = 0; i < daysPerWeek * (totalDays / 7); i++) {
    const challenge = shuffledChallenges[i % shuffledChallenges.length];
    const scheduledDate = new Date(startDate);
    scheduledDate.setDate(scheduledDate.getDate() + dayOffset);

    schedule.push({
      challenge,
      date: scheduledDate,
    });

    dayOffset += Math.floor(7 / daysPerWeek); // Spread challenges across the week
  }

  // Save user challenge schedule (replace this with database logic)
  const userId = req.user?.id || "test-user"; // Replace with authenticated user ID
  userChallenges[userId] = schedule;

  res.status(201).json({ message: "Challenge period started", schedule });
});

// Get a random challenge for the user
router.get("/random", protect, (req, res) => {
  const userId = req.user?.id || "test-user"; // Replace with authenticated user ID
  const today = new Date().toISOString().split("T")[0];

  if (!userChallenges[userId]) {
    return res.status(404).json({ message: "No challenges found for the user" });
  }

  // Find today's challenge
  const todayChallenge = userChallenges[userId].find(
    (entry) => entry.date.toISOString().split("T")[0] === today
  );

  if (!todayChallenge) {
    return res.status(404).json({ message: "No challenge scheduled for today" });
  }

  res.json(todayChallenge.challenge);
});


router.post("/complete", protect, (req, res) => {
  const userId = req.user.id;
  const { challengeId } = req.body;

  // Logic to mark the challenge as completed (replace with database logic)
  const userSchedule = userChallenges[userId];
  if (!userSchedule) {
      return res.status(404).json({ message: "No challenges found for the user" });
  }

  const challenge = userSchedule.find((entry) => entry.challenge.id === challengeId);
  if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
  }

  challenge.completed = true; // Mark as completed
  res.json({ message: "Challenge marked as completed!" });
});


export default router;