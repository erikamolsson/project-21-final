import styled from "styled-components";
import PropTypes from "prop-types";


const RadioGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.1rem;
  margin: 1rem 0;
`;

const RadioLabel = styled.label`
  display: flex;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
    accent-color: #e75757;
  }
`;



export const RadioButtons = ({ options, name, value, onChange }) => {
  return (
    <RadioGroupWrapper>
      {options.map((option, index) => (
        <RadioLabel key={index}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.label}
        </RadioLabel>
      ))}
    </RadioGroupWrapper>
  );
};


RadioButtons.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


// Use like this:
//const [category, setCategory] = useState("");

//const categoryOptions = [
//    { label: "Category 1", value: "category1" },
//    { label: "Category 2", value: "category2" },
//    { label: "Category 3", value: "category3" },
//    { label: "Category 4", value: "category4" },
//    { label: "Category 5", value: "category5" },
//    { label: "Choose for me!", value: "chooseForMe" },
//  ];

//  return (
//    <div>
//      <StyledTypography as="h2">What category do you wanna challenge yourself in?</StyledTypography>
//      <RadioButtonGroup
//        options={categoryOptions}
//        name="category"
//        value={category}
//        onChange={(value) => setCategory(value)}
//      />
//    </div>
//  );