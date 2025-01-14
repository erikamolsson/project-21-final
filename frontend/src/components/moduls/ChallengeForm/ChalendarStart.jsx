import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // standard css for chalendar


const StyledDatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;

  .react-datepicker {
    font-family: Arial, sans-serif;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #e75757;
    color: white;
    border-bottom: none;
  }

  .react-datepicker__day--selected {
    background-color: #e75757;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #e75757;
    color: white;
  }
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const ChalendarStart = ({ label, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Passar tillbaka det valda datumet
  };

  return (
    <StyledDatePickerWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        customInput={<StyledInput />}
        placeholderText="Select a date"
        showPopperArrow={false}
      />
    </StyledDatePickerWrapper>
  );
};
