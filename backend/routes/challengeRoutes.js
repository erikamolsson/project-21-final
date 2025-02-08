import { Router } from "express";
import challenges from "../data/challengesData.json";
import { usersChoiseChallenge } from "../models/usersChoiseChallenges.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();



// POST /api/challenges/start
// Start challenge period for a user
router.post("/start", protect, async (req, res) => {
  try {
    const { category, time, daysPerWeek, startDate, challenges } = req.body;
    

    if (!category || !time || !daysPerWeek || !startDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Debugging: Log the request body to see if it's received correctly
    console.log("Received request body:", req.body);

    // Your existing challenge scheduling logic...
    const totalDays =
      time === "One week" ? 7 :
      time === "Three weeks" ? 21 :
      time === "One month" ? 30 :
      time === "Three months" ? 90 :
      7;

    // Filter challenges by category
    const filteredChallenges =
      category !== "chooseForMe"
        ? challenges.filter((challenge) => challenge.category === category)
        : challenges;

    const shuffledChallenges = filteredChallenges.sort(() => 0.5 - Math.random());
    
    // Schedule challenges
    const schedule = [];
    let dayOffset = 0;

    for (let i = 0; i < daysPerWeek * (totalDays / 7); i++) {
      const challenge = shuffledChallenges[i % shuffledChallenges.length];
      const scheduledDate = new Date(startDate);
      scheduledDate.setDate(scheduledDate.getDate() + dayOffset);

      schedule.push({
        challenge: {
          id: challenge.id,
          title: challenge.title,
          text: challenge.text,
          category: challenge.category
        },
        date: scheduledDate,
        completed: false
      });

      dayOffset += Math.floor(7 / daysPerWeek);
    }

    console.log("filteredChallenges:", filteredChallenges);

    const userId = req.user?.id;
    console.log("User:", userId)

    // 🔥 Save to MongoDB instead of `userChallenges`
    const challengePeriod = new usersChoiseChallenge({
      userId,
      category,
      time,
      daysPerWeek,
      startDate: new Date(startDate),
      challenges: schedule
    });

    await challengePeriod.save();

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    res.status(201).json({ 
      message: "Challenge period started" 
    });

  } catch (error) {
    console.error("Error in /start:", error); // Logs full error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a random challenge for the user
router.get("/random", protect, async (req, res) => {
  const userId = req.user?.id; 
  const today = new Date().toISOString().split("T")[0];

  console.log("🔍 Fetching challenges for user:", userId);
  console.log("🔍 Today's date:", today);

  const challengePeriod = await usersChoiseChallenge.findOne({ userId });

  console.log("🔍 Challenge Period Found:", challengePeriod); // 🔥 Debugging

  if (!challengePeriod) {
    console.error("❌ No challenges found in database for user");
    return res.status(404).json({ 
      message: "No challenges found for the user" 
    });
  }

   // 🔥 Log all challenges before filtering by date
   console.log("🔍 All Challenges:", challengePeriod.challenges);

  // Find today's challenge
  const todayChallenge = challengePeriod.challenges.find(
    (entry) => {
      const entryDate = new Date(entry.date).toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
      console.log("🔍 Checking Challenge Date:", entryDate, " vs ", today); // Debugging

    return entryDate === today;
  }
);

  console.log("🔍 Today's Challenge:", todayChallenge); // 🔥 Debugging

  if (!todayChallenge) {
    return res.status(404).json({ 
      message: "No challenge scheduled for today" 
    });
  }

  res.json(todayChallenge.challenge);
});


router.post("/complete", protect, async (req, res) => {
  const userId = req.user.id;
  const { challengeId } = req.body;

  try {
    // Find the user's challenge document in MongoDB
    const challengePeriod = await usersChoiseChallenge.findOne({ userId });

    if (!challengePeriod) {
      return res.status(404).json({ message: "No challenges found for the user" });
    }

    // Find the specific challenge inside the array
    const challenge = challengePeriod.challenges.find(
      (entry) => entry.challenge.id === challengeId
    );

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Mark challenge as completed
    challenge.completed = true;

    // Save the updated challenge period in MongoDB
    await challengePeriod.save();

    res.json({ message: "Challenge marked as completed!" });

  } catch (error) {
    console.error("Error completing challenge:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;