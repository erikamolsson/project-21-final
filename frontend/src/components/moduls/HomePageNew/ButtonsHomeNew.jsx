import { useState } from "react";
import { Button } from "../../reusable/Buttons/Buttons";
import { Typography } from "../../reusable/Typography/Typography";
import { SignInPopup } from "../HomePageNew/SignInPopup";
import styled from "styled-components";
import { Link } from "react-router-dom";
/* import { isValid } from "date-fns"; */

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    width: 90%;
`;

export const ButtonsHomeNew = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
          <Section>
            <Typography variant="p" fontWeight="bold">
                Wanna challenge your self? Register now!
            </Typography>
            <StyledLink to="/register">
                <Button 
                text="Register!"
                backgroundColor="#e43f3f" 
                width="100%"
                />
            </StyledLink>
            <Typography variant="p" fontWeight="bold">
                Already register? Sign in below.
            </Typography>
            
            <Button 
                text="Sign in!"
                backgroundColor="#008441" 
                width="90%"
                onClick={togglePopup}
            />
            
            <SignInPopup 
                isVisible={isPopupVisible} togglePopup={togglePopup}
            />
          </Section>
    );
};