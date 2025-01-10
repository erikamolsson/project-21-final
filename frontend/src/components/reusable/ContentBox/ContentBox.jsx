import PropTypes from "prop-types";
import styled from "styled-components";


const tabletBreakpoint = "768px";

export const StyledContentBox = styled.section`
    background-color: ${(props) => props.backgroundColor};
    width: ${(props) => props.width};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */

    @media (max-width: ${tabletBreakpoint}) {
        width: 90%;
        padding: 15px;
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
    margin: "10px",
    backgroundColor: "#F3EFE5",
    width: "90%",
};
