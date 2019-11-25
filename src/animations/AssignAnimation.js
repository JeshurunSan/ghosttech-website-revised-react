import React, { Component } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import { getViewportPercentage } from '@helpers/viewport';
import { pulseAnimation, GHOST_IDLE, GHOST_RIGHT } from '@helpers/svg';

import Ghost from '@svg/ghost-right.svg';
import Crop from '@svg/ghost-crop.svg';

class Assign extends Component {

    constructor() {
        super();

        this.animationRef = React.createRef();

        this.ghost = null;
        this.crop = null;

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const { current } = this.animationRef;

        const percentage = getViewportPercentage(current);

        if (percentage > 0.4) {
            window.removeEventListener('scroll', this.handleScroll);

            this.playAnimation();
        }
    }

    playAnimation() {
        const { current: animation } = this.animationRef;

        this.ghost = animation.querySelector('.ghost');
        this.ghostPath = animation.querySelector('.ghost path');
        this.crop = animation.querySelector('.crop');

        const timeline = anime.timeline({
            easing: 'easeOutQuad',
            loop: true
        });

        timeline.add({
            targets: this.ghost,
            left: ['-20%', '50%'],
            duration: 1000
        });

        timeline.add({
            targets: this.ghostPath,
            d: [
                { value: GHOST_IDLE }
            ],
            duration: 1000
        }, 200);

        timeline.add({
            targets: this.ghost,
            left: ['50%', '130%'],
            duration: 1000,
            easing: 'easeInQuad',
        }, 2000);

        timeline.add({
            targets: this.ghostPath,
            d: [
                { value: GHOST_RIGHT }
            ],
            duration: 1000,
            easing: 'easeInQuad'
        }, 1900);

        timeline.add({
            targets: this.crop,
            translateX: ['-50%', '-50%'],
            scale: [1, 0.8],
            opacity: [0, 1],
            duration: 500
        }, 500);

        timeline.add({
            targets: this.crop,
            translateX: ['-50%', '-50%'],
            scale: [0.8, 1],
            opacity: [1, 0],
            duration: 500
        }, 1900);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <StyledAssign ref={ this.animationRef } { ...this.props }>
                <Ghost ref={ this.ghostRef } className="ghost" />
                <Crop ref={ this.cropRef } className="crop" />
            </StyledAssign>
        );
    }
}

const StyledAssign = styled.div`
    height: 14rem;
    position: relative;
    overflow: hidden;
    max-width: 15rem;
    
    .ghost {
        width: 8rem;
        position: absolute;
        left: -30%;
        top: 3rem;
        transform: translateX(-50%);
        /* animation: ${pulseAnimation(1)} 1s linear infinite; */
    }

    .crop {
        width: 10rem;
        position: absolute;
        left: 50%;
        opacity: 0;
        transform: translateX(-50%);
        transform-origin: 50% 50%;
    }
`;

export default Assign;
