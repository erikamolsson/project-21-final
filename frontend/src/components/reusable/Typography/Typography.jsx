import PropTypes from "prop-types";
import { StyledTypography } from "./Typography.styles.jsx";


// use like this = <Typography variant="h1" fontWeight="bold" fontSize="2.5rem" color="#d9534f">
export const Typography = ({ variant, children, fontWeight, color, fontSize, textAlign}) => {
    return (
        <StyledTypography
            as={variant} // h1:a, h2:a eller p 
            fontWeight={fontWeight}
            color={color}
            fontSize={fontSize}
            textAlign={textAlign}
        >
            {children}
        </StyledTypography>
    );
};


Typography.propTypes = {
    variant: PropTypes.oneOf(["h1", "h2", "p"]),
    children: PropTypes.node.isRequired,
    fontWeight: PropTypes.oneOf(["normal", "bold", "lighter"]),
    color: PropTypes.string,
    fontSize: PropTypes.string,
    textAlign: PropTypes.oneOf(["center", "left", "right"]),
};

// standard typography
Typography.defaultProps = {
    variant: "p",
    fontWeight: "normal",
    color: "#000",
    fontSize: "1rem",
    textAlign: "left",
};
