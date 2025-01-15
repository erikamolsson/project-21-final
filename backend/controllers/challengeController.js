import { Challenge } from "../models/Challenge";

// Get all challenges
export const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Create a challenge (maybe)
/* export const createChallenge = async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const newChallenge = new Challenge({ title, description });
      await newChallenge.save();
      res.status(201).json(newChallenge);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }; */