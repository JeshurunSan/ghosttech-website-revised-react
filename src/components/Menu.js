import React, { Component } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import animateScrollTo from 'animated-scroll-to';

import Content from '../Content';

import { isMobileViewport } from '@helpers/viewport';
import { length } from '@helpers/math';

import { AppContext } from '@providers/AppProvider';

import Media from '@style/media';
import { transitionDelay } from '@style/helpers';

import Button, { StyledButton } from '@components/Button';
import ArrowRight from '@svg/arrow-right.svg';

class Menu extends Component {
    static contextType = AppContext;

    constructor() {
        super();

        this.wipeRef = React.createRef();
        this.navRef = React.createRef();
        this.menuRef = React.createRef();

        this.handleAnchorClick = this.handleAnchorClick.bind(this);

        this.animation = null;

        this.state = {
            isOpen: false
        };
    }

    handleAnchorClick(event) {
        event.preventDefault();

        const anchor = event.target.getAttribute('href').replace(/#/, '');
        const target = document.querySelector(`a[name=${anchor}]`);

        if (anchor === 'our-capabilities') {
            const { isExpanderOpen } = this.context;

            if (!isExpanderOpen) {
                this.context.toggleExpander(true);
            } else {
                animateScrollTo(target, { speed: 1000, offset: -50 });
            }

            this.context.toggleMenu();
            return;
        }

        if (target){
            animateScrollTo(target, { speed: 1000, offset: -50 });

            this.context.toggleMenu();
        }
    }

    animateWipe(isMenuOpen) {
        const { current: wipe } = this.wipeRef;
        const { current: nav } = this.navRef;
        const { current: menu } = this.menuRef;

        const isMobile = isMobileViewport();

        const navBounds = nav.getBoundingClientRect();

        const radius = isMobile ?
            length(window.innerWidth * 0.5, navBounds.top, navBounds.right, navBounds.bottom) * 2 :
            length(window.innerWidth, 0, navBounds.left, navBounds.bottom) * 2.2;

        const xPosition = (radius * 0.5) - (window.innerWidth * 0.5);

        let target = {
            width: 30,
            height: 30,
            bottom: 30,
            right: isMobile ? 30 : 45,
            top: 'auto',
            delay: 300
        };

        if (isMenuOpen) {
            target = {
                width: radius,
                height: radius,
                bottom: -(radius * 0.5),
                right: isMobile ? -xPosition : -(radius * 0.5),
                top: 'auto',
                delay: 0
            };
        }

        if (!isMobile) {
            target.top = isMenuOpen ? -(radius * 0.5) : 45;
        } else {
            wipe.style.top = 'auto';
        }

        if (this.animation) {
            this.animation.pause();
        }

        this.animation = anime({
            targets: wipe,
            easing: 'easeInOutQuad',
            duration: 300,
            begin: () => {
                menu.classList.toggle('is-opening', isMenuOpen);
                menu.classList.toggle('is-closing', !isMenuOpen);
            },
            complete: () => {
                this.setState({
                    isOpen: isMenuOpen
                });
            },
            ...target
        });
    }

    componentDidUpdate(prevProps) {
        const { isMenuOpen } = this.props;

        if (isMenuOpen !== prevProps.isMenuOpen) {
            if (isMenuOpen) {
                this.setState({
                    isOpen: true
                });
            }

            setTimeout(() => {
                this.animateWipe(isMenuOpen);
            }, 0);
        }
    }

    render() {
        const { isOpen } = this.state;

        return (
            <StyledMenu ref={ this.menuRef } className={ isOpen ? 'is-visible' : '' } { ...this.props }>
                <nav ref={ this.navRef }>
                    <ul>
                        { Content.Menu.map((item, index) => {
                            return (
                                <li key={ index }><a onClick={ this.handleAnchorClick } href={ item.href }>{ item.label }</a></li>
                            );
                        }) }
                    </ul>

                    <Button href={ `mailto:${Content.Email}` }>Get in touch <ArrowRight /></Button>
                </nav>
                <div className="wipe" ref={ this.wipeRef }></div>
            </StyledMenu>
        );
    }
}

const StyledMenu = styled.div`
    display: none;
    position: absolute;
    z-index: 4;

    .wipe {
        background: ${props => props.theme.colourTextDark};
        border-radius: 50%;
        bottom: 3rem;
        height: 3rem;
        position: fixed;
        right: 3rem;
        transition: box-shadow 0.3s ease-in-out;
        width: 3rem;

        ${Media.desktop`
            bottom: auto;
            top: 3rem;
        `}
    }

    nav {
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        padding: 4rem 0 8rem 0;
        margin: 0 4rem;
        overflow: hidden;
        color: ${props => props.theme.colourTextLight};
        z-index: 4;

        ${Media.desktop`
            bottom: auto;
            top: 0;
            left: auto;
            max-width: 28rem;
            margin-right: 16rem;
            padding-top: 6rem;
        `}
    }

    ul {
        margin: 0 0 3rem 0;
        padding: 0;
        list-style-type: none;

        a {
            color: ${props => props.theme.colourTextLight};
            text-decoration: none;
            font-weight: 700;
        }
    }

    li {
        margin: 0 0 1.5rem 0;
        transition: transform 0.3s ease-in-out;
        transform: translateX(-100%);

        ${transitionDelay(5, 0.05)};
    }

    p {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 400;
    }

    ${StyledButton} {
        margin-bottom: 1.5rem;
        background: ${props => props.theme.colourTextLight};
        color: ${props => props.theme.colourTextDark};

        svg {
            path,
            polygon,
            polyline {
                stroke: ${props => props.theme.colourTextDark};
            }
        }
    }

    p, ${StyledButton} {
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
        transition-delay: 0.2s;
    }

    &.is-visible {
        display: block;
    }

    &.is-opening {
        li {
            transform: translateX(0);
        }

        p, ${StyledButton} {
            opacity: 1;
        }

        .wipe {
            box-shadow: rgba(160, 172, 181, 0.5) 0 0 8rem 0;
        }
    }
`;

export default Menu;
