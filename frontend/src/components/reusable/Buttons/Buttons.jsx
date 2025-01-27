import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";



const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const Button = ({ text, backgroundColor, onClick, width }) => {
    return (
        <StyledButton backgroundColor={backgroundColor} onClick={onClick} width={width}>
            {text}
        </StyledButton>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    width: PropTypes.string,
};


// How to use the code with the red button for example
// <Button text="Start the challenge!" width="100%" backgroundColor="#E75757" onClick={handleStartChallenge}/>
