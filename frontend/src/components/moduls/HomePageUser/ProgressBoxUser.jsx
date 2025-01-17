import { useState } from "react";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { ProgressBar } from "../HomePageUser/ProgressBar";
import { ChallengePopup } from "./ChallengePopup";
/* import { EarningsBox } from "../HomePageUser/EarningsBox";  */


export const ProgressBoxUser = () => {
    const [progress, setProgress] = useState(10);

    // Popup
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    const handleCompleteChallenge = () => {
        setProgress((prev) => Math.min(prev + 10, 100));
    };

    return (
        <ContentBox>
            <Typography variant="h2">
                Daily challenge/quest! 
            </Typography>
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
            <ChallengePopup isOpen={showPopup} onClose={handleClosePopup} />
        </ContentBox>
    );
};