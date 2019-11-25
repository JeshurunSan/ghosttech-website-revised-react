import React, { Component } from 'react';
import styled from 'styled-components';
import Media from '@style/media';
import anime from 'animejs';

import { lerp } from '@helpers/math';
import { pulseAnimation, GHOST_LEFT, GHOST_IDLE, GHOST_RIGHT } from '@helpers/svg';

import Ghost from '@svg/ghost-idle.svg';

const rangePercent = (min, max, current) => {
    return (current - min) / (max - min);
};

class Scroll extends Component {

    static defaultProps = {
        property: 'top',
        speed: 1
    };

    constructor() {
        super();

        this.animationRef = React.createRef();

        this.ghost = null;
        this.ghostPath = null;
        this.animation = null;

        this.velocity = 0;
        this.velocityProgress = 0;
        this.lastVelocityProgress = 0;
        this.lastScrollY = 0;
        this.scrollY = 0;

        this.handleFrame = this.handleFrame.bind(this);
    }

    handleFrame() {
        requestAnimationFrame(this.handleFrame);

        this.velocity = this.velocity * 0.95;

        this.lastScrollY = this.scrollY;
        this.scrollY = window.scrollY;

        this.velocity = (this.scrollY - this.lastScrollY) * 5;
        this.velocity = Math.min(this.velocity, 50);
        this.velocity = Math.max(this.velocity, -50);

        this.lastVelocityProgress = this.velocityProgress;
        this.velocityProgress = 0.5 + (rangePercent(-50, 50, this.velocity) * 0.5);

        const { current: animation } = this.animationRef;
        const { property, speed } = this.props;

        const bounds = animation.getBoundingClientRect();

        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
            const yPosition = Math.max(window.innerHeight - bounds[property], 0);

            const animationProgress = (yPosition / window.innerHeight) * speed;

            if (this.ghost) {
                this.ghost.style.left = `${lerp(-50, 120, animationProgress)}%`;

                if (Math.abs(this.velocityProgress - this.lastVelocityProgress) > 0.01) {
                    this.animation.seek(this.animation.duration * this.velocityProgress);
                }
            }
        }
    }

    componentDidMount() {
        const { current: animation } = this.animationRef;

        this.ghost = animation.querySelector('.ghost');
        this.ghostPath = animation.querySelector('.ghost path');

        this.animation = anime({
            targets: this.ghostPath,
            d: [
                { value: GHOST_LEFT },
                { value: GHOST_IDLE },
                { value: GHOST_IDLE },
                { value: GHOST_RIGHT }
            ],
            duration: 2000,
            delay: 2000,
            easing: 'linear',
            // autoplay: false
        });

        requestAnimationFrame(this.handleFrame);
    }

    render() {
        return (
            <StyledScroll ref={ this.animationRef } { ...this.props }>
                <Ghost className="ghost" />
            </StyledScroll>
        );
    }
}

const StyledScroll = styled.div`
    height: 9rem;
    position: relative;
    overflow: hidden;
    margin: 2rem -4rem 4rem 0;

    ${Media.desktop`
        margin-right: 0;
        width: ${props => props.isSmall ? '64.44%' : '100%'};
    `};

    .ghost {
        width: 10rem;
        position: absolute;
        left: -15%;
        animation: ${pulseAnimation(1)} 1s linear infinite;
    }
`;

export default Scroll;
