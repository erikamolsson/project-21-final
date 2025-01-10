import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";



const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const Button = ({ text, backgroundColor, onClick }) => {
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
