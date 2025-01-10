import styled, { css } from "styled-components";

// standard style for every variant
const variantStyles = {
    h1: {
      fontSize: "2.5rem", 
      fontSizeTablet: "2rem", 
      fontSizeMobile: "1.8rem", 
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontSizeTablet: "1.8rem",
      fontSizeMobile: "1.5rem",
      fontWeight: "normal",
    },
    p: {
      fontSize: "1rem",
      fontSizeTablet: "0.9rem",
      fontSizeMobile: "0.8rem",
      fontWeight: "normal",
    },
  };
  
  // Media query breakpoints
  const breakpoints = {
    tablet: "768px",
    mobile: "480px",
  };
  
  export const StyledTypography = styled.div`
    ${(props) => {
      const variant = variantStyles[props.as] || variantStyles.p; // Standard p if a variant doesnt exist
  
      return css`
        font-weight: ${props.fontWeight || variant.fontWeight};
        color: ${props.color || "#000"};
        text-align: ${props.textAlign || "left"};
  
        // size for desktop
        font-size: ${props.fontSize || variant.fontSize};
  
        // responsive variants
        @media (max-width: ${breakpoints.tablet}) {
          font-size: ${props.fontSize || variant.fontSizeTablet};
        }
  
        @media (max-width: ${breakpoints.mobile}) {
          font-size: ${props.fontSize || variant.fontSizeMobile};
        }
      `;
    }}
  
    margin: 0; 
  `;

/*   export default StyledTypography; */