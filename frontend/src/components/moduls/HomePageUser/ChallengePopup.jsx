
import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";
import { Button } from "../../reusable/Buttons/Buttons";



const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;



// Main Component
export const ChallengePopup = ({ isOpen, onClose, challenge }) => {
  if (!isOpen || !challenge) return null;


  return (
    <Overlay>
      <PopupBox>
        <Typography variant="h2">
            Today's Challenge
        </Typography>
        <Typography variant="p">
            {challenge.text}
            {/* {challenge} */}
        </Typography>
        <Button 
            text="OK"
            backgroundColor="#e43f3f" 
            width="100%"
            onClick={onClose} 
        />
      </PopupBox>
    </Overlay>
  );
};

