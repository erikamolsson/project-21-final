import styled, { css } from "styled-components";

// standard style for every variant
const variantStyles = {
    h1: {
      fontSize: "2.6rem", 
      fontSizeTablet: "2.3rem", 
      fontSizeMobile: "2rem", 
      fontWeight: "bold",
      fontFamily: "Playfair Display, serif;",
      marginAll: "2.5rem 0 1rem"
    },
    h2: {
      fontSize: "2rem",
      fontSizeTablet: "1.7rem",
      fontSizeMobile: "1.4rem",
      fontWeight: "normal",
      fontFamily: "Playfair Display, serif;",
      marginAll: "0.5rem 0 0.4rem",
      paddingAll: "1rem 0 0"
    },
    p: {
      fontSize: "1rem",
      fontSizeTablet: "0.9rem",
      fontSizeMobile: "0.8rem",
      fontWeight: "normal",
      fontFamily: "Roboto, serif;",
      marginAll: "0.5rem 0"
    },
    label: {
      fontSize: "1rem",
      fontSizeTablet: "0.9rem",
      fontSizeMobile: "0.8rem",
      fontWeight: "bold",
      fontFamily: "Roboto, serif;",
      marginAll: "0.5rem 0"
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
        font-family: ${props.fontFamily || variant.fontFamily};
        margin: ${props.marginAll || variant.marginAll};
        padding: ${props.paddingAll || variant.paddingAll};
  
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
  `;

/*   export default StyledTypography; */