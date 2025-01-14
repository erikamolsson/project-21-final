import styled from "styled-components";
import PropTypes from "prop-types";


const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const SliderLabel = styled.span`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const StyledSlider = styled.input`
 /*  -webkit-appearance: none; */
  width: 100%;
  height: 10px;
  background: ${({ value, max }) => `linear-gradient(to right, #e75757 ${(value / max) * 100}%, #ccc ${(value / max) * 100}%)`};
  border-radius: 5px;
  outline: none;
  transition: background 0.3s ease-in-out;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #e75757;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #e75757;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const SliderCount = ({ label, value, min, max, step, onChange }) => {
  return (
    <SliderWrapper>
      <SliderLabel>{label}: {value}</SliderLabel>
      <StyledSlider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </SliderWrapper>
  );
};


SliderCount.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

SliderCount.defaultProps = {
  step: 1, 
};
