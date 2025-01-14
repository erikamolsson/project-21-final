import styled from "styled-components";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";


const Article = styled.article`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
`;

export const ProfileSettings = () => {

    return (
        <section>
            <Typography variant="h2">
                Settings
            </Typography>
            <ContentBox>
                <Article>
                    <Typography variant="p" fontWeight="bold">
                        Notiser
                    </Typography>
                    <Typography variant="p" fontWeight="bold">
                        ON
                    </Typography>
                </Article>
                <Article>
                <Typography variant="p" fontWeight="bold">
                        Notiser
                    </Typography>
                    <Typography variant="p" fontWeight="bold">
                        ON
                    </Typography>
                </Article>
                <Article>
                    <Typography variant="p" fontWeight="bold">
                        Notiser
                    </Typography>
                    <Typography variant="p" fontWeight="bold">
                        ON
                    </Typography>
                </Article>
            </ContentBox>
            <Button 
                text="Change my settings"
                backgroundColor="#E75757" 
                width="100%"
                /* onClick={handleCompleteChallenge} */
            />
        </section>
    );
};
