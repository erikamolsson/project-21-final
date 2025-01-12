import { Button } from "../../reusable/Buttons/Buttons";
import { Typography } from "../../reusable/Typography/Typography";
import styled from "styled-components";

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ButtonsHomeNew = () => {

    return (
        <Section>
            <Typography variant="p" fontWeight="bold">
                Wanna challenge your self? Register now!
            </Typography>
            <Button 
                text="Sign up!"
                backgroundColor="#E75757" 
                width="90%"
                /* onClick={} */
            />
            <Typography variant="p" fontWeight="bold">
                Already register? Log in below.
            </Typography>
            <Button 
                text="Log in!"
                backgroundColor="#91BB97" 
                width="90%"
                /* onClick={} */
            />
        </Section>
    );
};