import styled from "styled-components";
import { Typography } from "../../reusable/Typography/Typography";


const FooterContainer = styled.footer`
  background-color: #eddcaf;
  padding: 1rem 0;
  width: 100%;
  margin: 4rem auto 0;
  border-top: 1px solid #d3cdbc;
`;


export const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="p" textAlign="center">
        Made by: <strong>Erika M Olsson</strong> |{" "}
        <a href="mailto:erikamolsson87@gmail.com">erikamolsson87@gmail.com</a>
      </Typography>
    </FooterContainer>
  );
};
