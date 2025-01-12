import styled from "styled-components";
import PropTypes from "prop-types";
import { Typography } from "../../reusable/Typography/Typography";


const EarningsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const EmojiGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

// Style for every emoji/price
const EmojiBox = styled.div`
  font-size: 2rem;
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;


export const EarningsBox = ({ rewards }) => {
  return (
    <EarningsContainer>
        <Typography variant="h2">
            Earnings
        </Typography>
      <EmojiGrid>
        {rewards.map((reward, index) => (
          <EmojiBox key={index}>{reward}</EmojiBox>
        ))}
      </EmojiGrid>
    </EarningsContainer>
  );
};


EarningsBox.propTypes = {
  rewards: PropTypes.arrayOf(PropTypes.string).isRequired,
};
