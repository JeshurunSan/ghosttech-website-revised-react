import React from 'react';
import styled from 'styled-components';

const Button = React.forwardRef((props, ref) => (
    <StyledButton ref={ ref } { ...props }>
        { props.children }
    </StyledButton>
));

const StyledButton = styled.a`
    background: ${props => props.theme.colourTextDark};
    color: ${props => props.theme.colourTextLight};
    cursor: pointer;
    display: flex;
    font-weight: 700;
    padding: 2rem 2.5rem;
    transition: background-color 0.2s ease-in-out, transform 1s ease-in-out, opacity 0.5s ease-in-out;
    position: relative;
    box-sizing: border-box;
    text-decoration: none;
    justify-content: space-between;

    svg {
        width: 2.7rem;
        height: 2.6rem;

        path,
        polygon,
        polyline {
            stroke-width: 0.3rem;
        }
    }
`;

export default Button;

export {
    StyledButton
};
