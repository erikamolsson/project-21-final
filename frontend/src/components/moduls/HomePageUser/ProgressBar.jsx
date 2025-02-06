import styled from "styled-components";
import PropTypes from "prop-types";
import { Typography } from "../../reusable/Typography/Typography";


const ProgressContainer = styled.div`
  width: 100%;
  background-color: #f4f4f4; 
  border-radius: 8px;
  overflow: hidden;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

// the red part on bar
const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #e43f3f;
  transition: width 0.3s ease-in-out;
`;



export const ProgressBar = ({ percentage }) => {
  return (
    <div>
        <Typography>
            Progress
        </Typography>
      <ProgressContainer>
        <Progress percentage={percentage} />
      </ProgressContainer>
    </div>
  );
};


ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};
