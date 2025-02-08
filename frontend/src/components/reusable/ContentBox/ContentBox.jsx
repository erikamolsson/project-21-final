import PropTypes from "prop-types";
import styled from "styled-components";


const tabletBreakpoint = "768px";

export const StyledContentBox = styled.section`
    background-color: ${(props) => props.backgroundColor};
    width: ${(props) => props.width};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */

    @media (max-width: ${tabletBreakpoint}) {
        padding: 15px;
        margin: 2rem 0;
    }
`;


export const ContentBox = ({ children, padding, margin, backgroundColor, width }) => {
    return (
        <StyledContentBox
            padding={padding}
            margin={margin}
            backgroundColor={backgroundColor}
            width={width}
        >
            {children}
        </StyledContentBox>
    );
};


ContentBox.propTypes = {
    children: PropTypes.node.isRequired,
    padding: PropTypes.string,
    margin: PropTypes.string,
    backgroundColor: PropTypes.string,
    width: PropTypes.string,
};

ContentBox.defaultProps = {
    padding: "20px",
    margin: "10px auto",
    backgroundColor: "#eddcaf",
};
