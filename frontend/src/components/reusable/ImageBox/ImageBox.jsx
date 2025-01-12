import PropTypes from "prop-types";
import styled from "styled-components";


const tabletBreakpoint = "768px";

const StyledImageBox = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: ${(props) => props.height};
        object-fit: cover;
    }

    @media (max-width: ${tabletBreakpoint}) {
        object-fit: contain;
    }
`;

export const ImageBox = ({ src, alt, height }) => {
    return (
        <StyledImageBox height={height}>
            <img src={src} alt={alt} />
        </StyledImageBox>
    );
};

ImageBox.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    height: PropTypes.string,
};

ImageBox.defaultProps = {
    height: "auto",
};

