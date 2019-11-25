import React, { Component } from 'react';
import styled from 'styled-components';
import anime from 'animejs';

import { getViewportPercentage } from '@helpers/viewport';

import Ghost from '@svg/ghost-right.svg';

class Accellerate extends Component {

    constructor() {
        super();

        this.animationRef = React.createRef();

        this.ghosts = [];

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

        this.ghosts[0] = animation.querySelector('.ghost-1');
        this.ghosts[1] = animation.querySelector('.ghost-2');

        const timeline = anime.timeline({
            duration: 1000,
            easing: 'easeInOutSine',
            loop: true
        });

        timeline.add({
            targets: this.ghosts[0],
            left: ['75%', '80%'],
            opacity: [1, 1],
            duration: 500,
        });

        timeline.add({
            targets: this.ghosts[0],
            left: ['80%', '75%'],
            opacity: [1, 1],
            duration: 500
        }, 500);

        const speedTimeline = anime.timeline({
            easing: 'easeOutSine',
            loop: true
        });

        speedTimeline.add({
            targets: this.ghosts[1],
            left: ['75%', '20%'],
            opacity: [0.6, 0],
            duration: 700
        }, 0);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <StyledAccellerate ref={ this.animationRef } { ...this.props }>
                <Ghost ref={ this.ghostRef } className="ghost ghost-1" />
                <Ghost ref={ this.ghostRef } className="ghost ghost-2" />
            </StyledAccellerate>
        );
    }
}

const StyledAccellerate = styled.div`
    height: 14rem;
    position: relative;
    overflow: hidden;
    max-width: 15rem;

    .ghost {
        width: 8rem;
        position: absolute;
        top: 3rem;
        left: -30%;
        opacity: 0;
        transform: translateX(-50%);
    }
`;

export default Accellerate;
