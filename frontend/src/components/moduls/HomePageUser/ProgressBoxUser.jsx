import { useState, useEffect } from "react";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { ProgressBar } from "../HomePageUser/ProgressBar";
import { ChallengePopup } from "./ChallengePopup";
/* import { EarningsBox } from "../HomePageUser/EarningsBox";  */


export const ProgressBoxUser = () => {
    const [progress, setProgress] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(null); // Stores today's challenge
    const [error, setError] = useState(""); 


    // Fetch today's challenge from the backend
    const fetchDailyChallenge = async () => {
        try {
            const response = await fetch("http://localhost:7777/api/challenges/random", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`, // Include user's token
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch today's challenge");
            }

            const data = await response.json();
            setCurrentChallenge(data); // Save the challenge from the backend
        } catch (err) {
            console.error("Error fetching daily challenge:", err);
            setError("Could not load today's challenge.");
        }
    };

    // Fetch challenge when component mounts
    useEffect(() => {
        fetchDailyChallenge();
    }, []);
    

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

        // Optionally, send completion status to the backend
        try {
            const response = await fetch("http://localhost:7777/api/challenges/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                },
                body: JSON.stringify({ challengeId: currentChallenge.id }),
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
                backgroundColor="#E75757" 
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