import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";


const FooterContainer = styled.footer`
  background-color: #F3EFE5;
  padding: 2rem 0;
  margin: 4rem 0 0;
  position: fixed;
  bottom: 0;
  width: 98%;
  margin: 0 auto;
  border-top: 1px solid #d3cdbc;
`;


export const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="p" textAlign="center">
        Made by: <strong>Erika Olsson</strong> |{" "}
        <a href="mailto:erikamolsson87@gmail.com">erikamolsson87@gmail.com</a>
      </Typography>
    </FooterContainer>
  );
};
