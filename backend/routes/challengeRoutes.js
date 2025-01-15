import express from "express";
import { getChallenges } from "../controllers/challengeController";


export const router = express.Router();

router.get("/", getChallenges);
/* router.post("/", createChallenge); */