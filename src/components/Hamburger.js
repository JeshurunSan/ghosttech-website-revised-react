import React, { Component } from 'react';
import styled from 'styled-components';
import Media from '@style/media';

import { AppContext } from '@providers/AppProvider';

class Hamburger extends Component {
    static contextType = AppContext;

    constructor() {
        super();

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.context.toggleMenu();
    }

    render() {
        const { isMenuOpen } = this.props;

        return (
            <StyledHamburger onClick={ this.handleToggle } className={ isMenuOpen ? 'is-open' : '' } { ...this.props }>
                <span className="closed"></span>
                <span className="closed"></span>
                <span className="closed"></span>

                <span className="open"></span>
                <span className="open"></span>
            </StyledHamburger>
        );
    }
}

const shadow = 'rgba(44, 51, 59, 0.41) 0 0.2rem 1.8rem 0';
const noShadow = 'transparent 0 0 0 0';

const StyledHamburger = styled.a`
    background: ${props => props.theme.colourTextDark};
    border-radius: 50%;
    bottom: 1.5rem;
    box-shadow: ${shadow}, ${noShadow};
    box-sizing: border-box;
    cursor: pointer;
    height: 6rem;
    overflow: hidden;
    position: fixed;
    right: 1.5rem;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 6rem;
    z-index: 5;

    ${Media.desktop`
        top: 3rem;
        right: 3rem;
        bottom: auto;
    `}

    .closed {
        background: ${props => props.theme.colourTextLight};
        height: 0.2rem;
        display: block;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        position: absolute;
        left: 1.5rem;
        right: 1.5rem;

        &:nth-child(1) {
            transition-delay: 0.2s;
            top: 2.1rem;
        }

        &:nth-child(2) {
            transition-delay: 0.1s;
            top: 2.9rem;
        }

        &:nth-child(3) {
            top: 3.7rem;
            left: 2.7rem;
        }
    }

    .open {
        background: ${props => props.theme.colourTextLight};
        height: 0.2rem;
        display: block;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        transition-delay: 0s;
        position: absolute;
        left: 1rem;
        right: 1rem;
        top: 2.9rem;
        transform: translateX(6rem);
        opacity: 0;

        &:nth-child(4) {
            transform: translateY(6rem) rotate(90deg);
        }
    }

    &.is-open {
        box-shadow: ${noShadow}, ${props => props.theme.colourTextLight} 0 0 0 0.2rem;
        transform: rotate(45deg);

        .closed {
            transform: translateX(-6rem);
            opacity: 0;
        }

        .open {
            transform: translateX(0%);
            opacity: 1;
            transition-delay: 0.2s;
    
            &:nth-child(4) {
                transform: translateY(0%) rotate(90deg);
                transition-delay: 0.3s;
            }
        }

        ${Media.desktop`
            box-shadow: ${noShadow}, ${noShadow};
        `}
    }
`;

export default Hamburger;
