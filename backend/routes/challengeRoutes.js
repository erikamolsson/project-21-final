import { Router } from "express";

const router = Router();

import challenges from "../data/challengesData.json";


// POST /api/challenges/filter
router.post("/filter", (req, res) => {
  const { category, time, daysPerWeek } = req.body;

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

  // Filter challenges by category if specified
  let filteredChallenges = [...challenges];
  if (category && category !== "chooseForMe") {
    filteredChallenges = filteredChallenges.filter(
      (challenge) => challenge.category === category
    );
  }

  // Limit challenges based on days per week
  const maxChallenges = Math.min(totalDays, daysPerWeek * (totalDays / 7));
  filteredChallenges = filteredChallenges.slice(0, maxChallenges);

  res.json(filteredChallenges);
});

export default router;
