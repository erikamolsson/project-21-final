import { useState, useEffect } from "react";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { ProgressBar } from "../HomePageUser/ProgressBar";
import { ChallengePopup } from "./ChallengePopup";
import { useUser } from "../../../context/UserContext";
/* import { EarningsBox } from "../HomePageUser/EarningsBox";  Not working right now ....*/


export const ProgressBoxUser = () => {
    const [progress, setProgress] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(null); // Stores today's challenge
    const [error, setError] = useState(""); 
    const { token } = useUser();

    const API_PROGRESS_URL = import.meta.env.VITE_API_URL_DEV;


    // Fetch today's challenge from the backend
    const fetchDailyChallenge = async () => {
        if (!token) {
            setError("You must be logged in to start a challenge.");
            return;
        }

        try {
            const response = await fetch(`${API_PROGRESS_URL}/challenges/random`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch today's challenge");
            }

            const data = await response.json();
            setCurrentChallenge(data); // Save the challenge from the backend
            setError("");
        } catch (err) {
            console.error("Error fetching daily challenge:", err);
            setError("Could not load today's challenge.");
        }
    };

    // Fetch challenge when component mounts
    useEffect(() => {
        fetchDailyChallenge();
    }, [currentChallenge]);
    

    const handleOpenPopup = () => {
        // Ensure a challenge is loaded before opening the popup
        if (!currentChallenge) {
            alert("No challenge available for today. Please try again later.");
            return;
        }

        setShowPopup(true);
    };

    const handleClosePopup = () => setShowPopup(false);

    const handleCompleteChallenge = async () => {
        if (!currentChallenge) {
            alert("Please start a challenge first!");
            return;
        }

        if (!token) {
            setError("You must be logged in to complete a challenge.");
            return;
        }

        try {
            const response = await fetch(`${API_PROGRESS_URL}/challenges/complete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ challengeId: currentChallenge?.challenge?.id || currentChallenge?.id }),
            });

            if (!response.ok) {
                throw new Error("Failed to mark the challenge as completed");
            }

            console.log("Challenge marked as completed!");
            setCurrentChallenge(null); // Clear the current challenge
            setProgress((prev) => Math.min(prev + 10, 100)); // Increase progress
        } catch (err) {
            console.error("Error marking challenge as completed:", err);
        }
    };

    return (
        <ContentBox>
            <Typography variant="h2">
                Daily challenge/quest! 
            </Typography>

            {error && <Typography variant="p" color="red">{error}</Typography>}

            <Button 
                text="Start the challenge!"
                backgroundColor="#e43f3f" 
                width="100%"
                onClick={handleOpenPopup}
            />
            <Typography variant="p">
                Have you finnished your challenge?
            </Typography>
            <Button 
                text="Challenge is done!"
                backgroundColor="#91BB97" 
                width="100%"
                onClick={handleCompleteChallenge}
            />
            <ProgressBar percentage={progress} />
            {/* <EarningsBox rewards={rewards} /> */}

            {/* Challenge popup */}
            <ChallengePopup
                isOpen={showPopup}
                onClose={handleClosePopup}
                challenge={currentChallenge}
            />
        </ContentBox>
    );
};