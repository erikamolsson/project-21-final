import styled from 'styled-components';

export const StyledButton = styled.button`
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
