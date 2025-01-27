import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";


const FooterContainer = styled.footer`
  background-color: #F3EFE5;
  padding: 1rem 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 98%;
  border-top: 1px solid #d3cdbc;
`;


export const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="p">
        Made by: <strong>Erika Olsson</strong> |{" "}
        <a href="mailto:erikamolsson87@gmail.com">erikamolsson87@gmail.com</a>
      </Typography>
    </FooterContainer>
  );
};
