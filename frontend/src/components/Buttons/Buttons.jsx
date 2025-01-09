import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./Buttons.styles";



const Button = ({ text, backgroundColor, onClick }) => {
    return (
        <StyledButton backgroundColor={backgroundColor} onClick={onClick}>
            {text}
        </StyledButton>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};


// How to use the code with the red button for example
// <Button text="Start the challenge!" backgroundColor="#E75757" onClick={handleStartChallenge}/>


export default Button;