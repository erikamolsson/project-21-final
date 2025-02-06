import { ImageBox } from "../../reusable/ImageBox/ImageBox";
import { Typography } from "../../reusable/Typography/Typography";


export const HeaderHomeNew = () => {

    return (
        <section>
            <ImageBox 
                src="/assets/tjej-app.png" 
                alt="Header New Visitor > Daily Quests" 
                height="400px"
            />
            <Typography variant="h1">
                Strengthen yourself with one challenge a day!
            </Typography>
        </section>
    );
};

