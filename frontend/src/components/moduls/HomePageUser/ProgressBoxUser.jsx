import { useState } from "react";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";
import { ProgressBar } from "../ProgressBar/ProgressBar";
/* import { EarningsBox } from "../EarningsBox/EarningsBox";  */


export const ProgressBoxUser = () => {
    const [progress, setProgress] = useState(30);

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
                width="90%"
                /* onClick={} */
            />
            <Typography variant="p">
                Have you finnished your challenge?
            </Typography>
            <Button 
                text="Challenge is done!"
                backgroundColor="#91BB97" 
                width="90%"
                onClick={handleCompleteChallenge}
            />
            <ProgressBar percentage={progress} />
            {/* <EarningsBox rewards={rewards} /> */}
        </ContentBox>
    );
};