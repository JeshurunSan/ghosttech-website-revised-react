import React, { Component } from 'react';
import styled from 'styled-components';
import anime from 'animejs';
import { getViewportPercentage } from '@helpers/viewport';
import { pulseAnimation, GHOST_LEFT, GHOST_IDLE, GHOST_RIGHT } from '@helpers/svg';

import GhostRight from '@svg/ghost-right.svg';
import GhostIdle from '@svg/ghost-idle.svg';
import GhostLeft from '@svg/ghost-left.svg';

class Augment extends Component {

    constructor() {
        super();

        this.animationRef = React.createRef();

        this.ghost1 = null;
        this.ghost2 = null;
        this.ghost3 = null;

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

        this.ghost1 = animation.querySelector('.ghost-1');
        this.ghost1Path = animation.querySelector('.ghost-1 path');

        this.ghost2 = animation.querySelector('.ghost-2');
        this.ghost2Path = animation.querySelector('.ghost-2 path');

        this.ghost3 = animation.querySelector('.ghost-3');
        this.ghost3Path = animation.querySelector('.ghost-3 path');

        this.ghost4 = animation.querySelector('.ghost-4');
        this.ghost4Path = animation.querySelector('.ghost-4 path');

        const timeline = anime.timeline({
            duration: 1000,
            easing: 'easeInOutQuad',
            loop: true
        });

        // Fade in 2
        timeline.add({
            targets: this.ghost2,
            opacity: [0, 1]
        });

        // Enter 1 & 3
        timeline.add({
            targets: this.ghost1,
            left: ['-30%', '20%']
        });

        timeline.add({
            targets: this.ghost1Path,
            d: [
                { value: GHOST_IDLE }
            ]
        }, '-=800');

        timeline.add({
            targets: this.ghost3,
            left: ['130%', '80%']
        }, '-=700');

        timeline.add({
            targets: this.ghost3Path,
            d: [
                { value: GHOST_IDLE }
            ]
        }, '-=800');

        // Fade out 2
        timeline.add({
            targets: this.ghost2,
            opacity: [1, 0]
        }, '+=1000');
        
        // Exit 1 & 3
        timeline.add({
            targets: this.ghost1,
            left: ['20%', '-30%']
        });

        timeline.add({
            targets: this.ghost1Path,
            d: [
                { value: GHOST_LEFT }
            ]
        }, '-=900');

        timeline.add({
            targets: this.ghost3,
            left: ['80%', '130%']
        }, '-=700');

        timeline.add({
            targets: this.ghost3Path,
            d: [
                { value: GHOST_RIGHT }
            ]
        }, '-=900');
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <StyledAugment ref={ this.animationRef } { ...this.props }>
                <GhostRight ref={ this.ghostRef } className="ghost ghost-cutout ghost-1" />
                <GhostIdle ref={ this.ghostRef } className="ghost ghost-2" />
                <GhostLeft ref={ this.ghostRef } className="ghost ghost-cutout ghost-3" />
                <GhostLeft ref={ this.ghostRef } className="ghost ghost-4" />
            </StyledAugment>
        );
    }
}

const StyledAugment = styled.div`
    height: 14rem;
    position: relative;
    overflow: hidden;
    max-width: 15rem;

    .ghost {
        width: 8rem;
        position: absolute;
        top: 3rem;
        left: -30%;
        transform: translateX(-50%);
        /* animation: ${pulseAnimation(1)} 1s linear infinite; */
    }

    .ghost-cutout {
        overflow: visible;

        path {
            fill: none;
            stroke: white;
            stroke-width: 0.3rem;
            stroke-dasharray: 5 5;
        }
    }

    .ghost-2 {
        left: 50%;
        opacity: 0;
    }

    .ghost-1,
    .ghost-3,
    .ghost-4 {
        top: 4rem;
    }

    .ghost-4 {
        left: 130%;
    }
`;

export default Augment;
