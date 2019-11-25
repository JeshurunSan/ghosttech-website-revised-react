import React, { Component } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import Media from '@style/media';
import animateScrollTo from 'animated-scroll-to';

import { AppContext } from '@providers/AppProvider';

import Button, { StyledButton } from '@components/Button';
import Cross from '@svg/cross.svg';

class Expander extends Component {
    static contextType = AppContext;

    constructor() {
        super();

        this.fillRef = React.createRef();
        this.contentRef = React.createRef();
        this.buttonRef = React.createRef();
        this.buttonHolderRef = React.createRef();

        this.handleToggle = this.handleToggle.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            isOpen: false,
            isSticky: false,
            isDropped: false
        };

        this.animation = null;
    }

    /**
     * Resize the container as the content reflows
     */
    handleResize() {
        const { isOpen } = this.state;

        if (!isOpen) {
            return;
        }

        const { current: fill } = this.fillRef;
        const { current: content } = this.contentRef;

        setTimeout(() => {
            const contentHeight = content.offsetHeight + 66;

            fill.style.height = `${contentHeight * 0.1}rem`;
            fill.style.clipPath = `circle(${contentHeight * 0.15}rem at 50% 0%)`;
        }, 0);
    }

    handleScroll() {
        const { current: buttonHolder } = this.buttonHolderRef;
        const { current: fill } = this.fillRef;
        const { isOpen, isSticky, isDropped } = this.state;

        if (!isOpen) {
            return;
        }

        const holderBounds = buttonHolder.getBoundingClientRect();
        const fillBounds = fill.getBoundingClientRect();

        const shouldSticky = holderBounds.top <= 0 && fillBounds.top < 0;
        const shouldDrop = fillBounds.bottom <= 66;

        if (shouldSticky !== isSticky || shouldDrop !== isDropped) {
            this.setState({
                isSticky: shouldSticky,
                isDropped: shouldDrop
            });
        }
    }

    handleToggle() {
        this.context.toggleExpander();
    }

    toggleExpander(newState = null) {
        const { current: fill } = this.fillRef;
        const { current: content } = this.contentRef;
        let { isOpen } = this.state;

        if (newState !== null) {
            isOpen = newState;
        } else {
            isOpen = !isOpen;
        }

        this.setState({
            isOpen: isOpen,
            isSticky: false,
            isDropped: false
        });

        const contentHeight = content.offsetHeight + 66;
        const buttonCenter = this.calculateButtonCenter();

        if (this.animation) {
            this.animation.pause();
        }

        this.animation = anime.timeline({
            duration: 1000,
            easing: 'easeInOutQuad'
        });

        this.animation.add({
            targets: fill,
            height: isOpen ? [0, contentHeight] : [contentHeight, 0],
        }, isOpen ? 0 : 200);

        const clipPath = isOpen ?
            [`circle(0rem at ${buttonCenter}% 0%)`, `circle(${contentHeight * 0.15}rem at ${buttonCenter}% 0%)`] :
            [`circle(${contentHeight * 0.15}rem at ${buttonCenter}% 0%)`, `circle(0rem at ${buttonCenter}% 0%)`];

        this.animation.add({
            targets: fill,
            '-webkitClipPath': clipPath,
            clipPath: clipPath
        }, isOpen ? 200 : 0);

        setTimeout(() => {
            animateScrollTo(fill, { speed: 1000 });
        }, 200);
    }

    calculateButtonCenter() {
        const { current: button } = this.buttonRef;

        const buttonBounds = button.getBoundingClientRect();
        const buttonX = buttonBounds.x + (buttonBounds.width * 0.5);

        return (buttonX / window.innerWidth) * 100;
    }

    componentDidUpdate() {
        const { isOpen } = this.state;
        const { isExpanderOpen } = this.context;

        if (isExpanderOpen !== isOpen) {
            this.toggleExpander(isExpanderOpen);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        const { children } = this.props;
        const { isOpen, isSticky, isDropped } = this.state;

        return (
            <StyledExpander { ...this.props } isOpen={ isOpen }>
                <div className={ `button-holder ${isSticky ? 'sticky' : ''} ${isDropped ? 'dropped' : ''}`} ref={ this.buttonHolderRef }>
                    <Button ref={ this.buttonRef } onClick={ this.handleToggle }>{ isOpen ? 'Hide our capabilities' : 'View our capabilities' } <Cross /></Button>
                </div>
                <div className="fill" ref={ this.fillRef }>
                    <div className="wrapper">
                        <div className="content"ref={ this.contentRef }>
                            { children }
                        </div>
                    </div>
                </div>
            </StyledExpander>
        );
    }
}

const StyledExpander = styled.div`
    color: ${props => props.theme.colourTextLight};
    position: relative;
    
    .fill {
        background: ${props => props.theme.colourTextDark};
        position: relative;
        overflow: hidden;
        height: 0;
    }

    .wrapper {
        max-width: 124rem;
        margin: 0 auto;
        position: relative;
        box-sizing: border-box;
        padding-top: 6.6rem;

        &:before {
            border: 0.1rem solid rgba(215, 215, 215, 0.23);
            border-width: 0 0 0 0.1rem;
            content: '';
            display: block;
            height: 100%;
            left: 4rem;
            margin: 0 auto;
            pointer-events: none;
            position: absolute;
            right: 50%;
            z-index: -1;
            top: 0;

            ${Media.desktop`
                border-width: 0 0.1rem 0 0.1rem;
            `}
        }
    }

    .content {
        padding: 4rem 4rem 20rem 4rem;
    }

    .column {
        ${Media.desktop`
            margin-right: 6rem;
        `};
    }

    h2 {
        margin: 0 0 6rem 0;
        color: ${props => props.theme.colourTextLight};
    }

    .button-holder {
        margin: 0 auto;
        max-width: 110rem;
        position: relative;
        z-index: 3;

        &.sticky {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
        }

        &.dropped {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 6.6rem;
            top: auto;
        }
    }

    ${StyledButton} {
        position: absolute;
        left: 1.5rem;
        right: 1.5rem;
        top: 0;
        z-index: 2;

        ${Media.desktop`
            left: 50%;
            right: 0;
        `};

        svg {
            transition: transform 0.2s ease-in-out;
            transform: ${props => props.isOpen ? 'rotate(225deg)' : 'rotate(0)'};
        }
    }
`;

export default Expander;
