import React, { Component } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import Media from '@style/media';

import LogoTech from '@svg/logo-tech.svg';

class Logo extends Component {
    constructor() {
        super();

        this.animation = null;

        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            isFinished: false
        };
    }

    handleScroll() {
        if (!this.animation) {
            return;
        }

        const { isFinished } = this.state;

        if (!isFinished) {
            return;
        }

        const viewportScrollPercentage = Math.min(window.scrollY / window.innerHeight, 1);

        this.animation.pause();
        this.animation.seek(this.animation.duration * (1 - (viewportScrollPercentage * 2)));
    }

    componentDidMount() {
        this.animation = anime.timeline({
            duration: 1500,
            easing: 'easeOutQuad',
            complete: () => {
                this.setState({
                    isFinished: true
                });
            }
        });

        // GHOST
        this.animation.add({
            targets: '.logo .ghost .letter-g',
            translateX: ['-100%', '0%']
        }, 0);

        this.animation.add({
            targets: '.logo .ghost .letter-h',
            translateX: ['-100%', '0%']
        }, 300);

        this.animation.add({
            targets: '.logo .ghost .letter-s',
            translateX: ['-100%', '0%']
        }, 600);

        this.animation.add({
            targets: '.logo .ghost .letter-t',
            translateX: ['-100%', '0%']
        }, 900);

        // TECH
        this.animation.add({
            targets: '.logo .tech .letter-t',
            translateX: ['-100%', '0%']
        }, 600);

        this.animation.add({
            targets: '.logo .tech .letter-e',
            translateX: ['-100%', '0%']
        }, 900);

        this.animation.add({
            targets: '.logo .tech .letter-c',
            translateX: ['-100%', '0%']
        }, 1200);

        this.animation.add({
            targets: '.logo .tech .letter-h',
            translateX: ['-100%', '0%']
        }, 1500);

        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <StyledLogo className="logo" { ...this.props }>
                <LogoTech />
            </StyledLogo>
        );
    }
}

const StyledLogo = styled.div`
    margin: 0 -4rem 1rem -4rem;
    z-index: 1;

    svg {
        position: relative;
    }

    ${Media.desktop`
        margin: 0 0 1rem 0;
    `}
`;

export default Logo;
