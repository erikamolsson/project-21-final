import styled from "styled-components";
import PropTypes from "prop-types";



const tabletBreakpoint = "768px";

const WhiteBox = styled.article`
    background-color: #fff;
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    @media (max-width: ${tabletBreakpoint}) {
        padding: 15px;
        margin: 1rem 0;
    }
`;

export const FormQuestion = ({ children, padding, margin }) => {
    return (
        <WhiteBox
            padding={padding}
            margin={margin}
        >
            {children}
        </WhiteBox>
    );
};

FormQuestion.propTypes = {
    children: PropTypes.node.isRequired,
    padding: PropTypes.string,
    margin: PropTypes.string,
};