import styled from "styled-components";
import { ContentBox } from "../../reusable/ContentBox/ContentBox";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";


const Article = styled.article`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
`;

export const ProfileInfo = () => {

    return (
        <section>
            <Typography variant="h2">
                Your information
            </Typography>
            <ContentBox>
                <Article>
                    <Typography variant="p" >
                        Password
                    </Typography>
                    <Typography variant="p" fontWeight="bold">
                        ********
                    </Typography>
                </Article>
                <Article>
                <Typography variant="p" >
                        User name
                    </Typography>
                    <Typography variant="p">
                        Alias
                    </Typography>
                </Article>
                <Article>
                <Typography variant="p" >
                        Name
                    </Typography>
                    <Typography variant="p">
                        Name Surname
                    </Typography>
                </Article>
            </ContentBox>
            <Button 
                text="Save my information"
                backgroundColor="#91BB97" 
                width="100%"
                /* onClick={handleCompleteChallenge} */
            />
        </section>
    );
};