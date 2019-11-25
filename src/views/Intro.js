import React, { Component } from 'react';
import styled from 'styled-components';

import animateScrollTo from 'animated-scroll-to';

import { getViewportPercentage } from '@helpers/viewport';
import Media from '@style/media';

import Logo from '@components/Logo';
import Cycler from '@components/Cycler';

import Arrow from '@svg/arrow.svg';

class Intro extends Component {
    constructor() {
        super();

        this.introRef = React.createRef();
        this.paragraphRef = React.createRef();

        this.handleCycled = this.handleCycled.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            showIntro: false,
            hideArrow: false
        };
    }

    handleScroll() {
        const { current } = this.introRef;
        const { showIntro, hideArrow } = this.state;

        if (showIntro && hideArrow) {
            window.removeEventListener('scroll', this.handleScroll);
            return;
        }

        const progress = getViewportPercentage(current, 'bottom');

        if (progress > 0.1 && (!showIntro || !hideArrow)) {
            this.setState({
                showIntro: true,
                hideArrow: true
            });
        }

    }

    handleArrowClick(event) {
        event.preventDefault();

        const target = document.querySelector('a[name=who-are-we]');

        animateScrollTo(target, { speed: 1000 });
    }

    handleCycled() {
        const { showIntro } = this.state;

        if (showIntro) {
            return;
        }

        this.setState({
            showIntro: true
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        setTimeout(() => {
            this.setState({
                showIntro: true
            });
        }, 3400);
    }

    render() {
        const { showIntro, hideArrow } = this.state;

        return (
            <StyledIntro ref={ this.introRef } showIntro={ showIntro } hideArrow={ hideArrow } className="screen">
                <Logo />

                <Cycler onComplete={ this.handleCycled } words={[
                    'Prototyping',
                    '^Software development',
                    'Architecture',
                    '^Product development',
                    '^Content management',
                    '^Technology strategy'
                ]} />

                <div className="intro-wrapper">
                    <p className="lead lead-intro" ref={ this.paragraphRef }>We enable innovative experiences through technology, from legacy migrations to progressive web apps to machine learning.</p>
                </div>

                <div className="arrow-wrapper">
                    <div className="arrow-container">
                        <Arrow onClick={ this.handleArrowClick } className="arrow" />
                    </div>
                </div>
            </StyledIntro>
        );
    }
};

const StyledIntro = styled.div`
    .lead-intro {
        transform-origin: 0 0;
        transform: ${props => props.showIntro ? 'translateX(0)' : 'translateX(-100%)'};
        opacity: ${props => props.showIntro ? 1 : 0};
        margin: 0 0 4rem 0;
        
        transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
    }

    .intro-wrapper {
        overflow: hidden;

        ${Media.desktop`
            margin-left: 32.2%;
        `}
    }

    .arrow-wrapper {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        transform: ${props => props.hideArrow ? 'translateY(100%)' : 'translateY(0)'};
        transition: transform 1s ease-in-out;
    }
    
    .arrow-container {
        max-width: 110rem;
        margin: 0 auto;
    }

    .arrow {
        width: 4rem;
        height: 4.8rem;
        cursor: pointer;
        padding: 2rem 0;
        display: block;

        path {
            fill: rgba(69, 79, 91, 0.5);
        }
    }
`;

export default Intro;
