import React, { Component } from 'react';
import styled from 'styled-components';
import Media from '@style/media';

class Container extends Component {

    render() {
        return (
            <StyledContainer { ...this.props } />
        );
    }
}

const StyledContainer = styled.div`
    box-sizing: border-box;
    max-width: 118rem;
    margin: 0 auto;
    padding: ${props => props.padTop ? '18.6rem' : '4rem'} 4rem 0 4rem;
    z-index: 1;
    position: relative;

    ${Media.desktop`
        padding-top: ${props => props.padTop ? '26.6rem' : '4rem'};
    `}

    &:before {
        border: 0.1rem solid ${props => props.theme.colourLine};
        border-width: 0 0 0 0.1rem;
        content: '';
        display: block;
        left: 4rem;
        margin: 0 auto;
        pointer-events: none;
        position: absolute;
        right: 4rem;
        top: 0;
        bottom: 0;
        z-index: -1;

        ${Media.desktop`
            border-width: 0 0.1rem 0 0.1rem;
        `}
    }

    &:after {
        display: none;

        ${Media.desktop`
            border: 0.1rem solid ${props => props.theme.colourLine};
            border-width: 0 0.1rem 0 0.1rem;
            bottom: 0;
            content: '';
            display: block;
            left: 33.333%;
            margin: 0 auto;
            pointer-events: none;
            position: absolute;
            right: 50%;
            top: 0;
            z-index: -1;
        `}
    }
`;

export default Container;
