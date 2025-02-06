import { ImageBox } from "../../reusable/ImageBox/ImageBox";
import { Typography } from "../../reusable/Typography/Typography";


export const HeaderHomeUser = () => {

    return (
        <section>
            <ImageBox 
                src="/assets/tjej-app.png" 
                alt="Header Logged in user > Daily Quests" 
                height="400px"
            />
            <Typography variant="h1">
                Todays challenge and overall progress
            </Typography>
        </section>
    );
};

