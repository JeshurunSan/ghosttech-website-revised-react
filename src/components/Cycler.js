import React, { Component } from 'react';
import styled from 'styled-components';
import Media from '@style/media';

class Cycler extends Component {

    constructor() {
        super();

        this.state = {
            activeIndex: -1,
            longLines: [],
            words: []
        };

        this.handleCycle = this.handleCycle.bind(this);
        this.interval = null;
    }

    handleCycle() {
        let { activeIndex } = this.state;
        const { words, onComplete } = this.props;

        activeIndex++;

        if (activeIndex >= words.length) {
            onComplete();

            activeIndex = 0;
        }

        this.setState({
            activeIndex
        });
    }

    componentDidMount() {
        const { words } = this.props;

        setTimeout(() => {
            this.interval = setInterval(this.handleCycle, 1200);
        }, 1000);

        const longLines = [];
        const newWords = [];

        // Check wich lines need to wrap
        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 20) {
                longLines.push(i);
            }
        }

        this.setState({
            longLines
        });

        // Check wich lines need to wrap
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            if (word[0] === '^') {
                longLines.push(i);
                word = word.substr(1);
            }

            newWords.push(word);
        }

        this.setState({
            longLines,
            words: newWords
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { words, activeIndex, longLines } = this.state;

        const isLongLine = (longLines.indexOf(activeIndex) >= 0);

        return (
            <StyledCycler className="lead" isLongLine={ isLongLine }>
                { words.map((word, index) => {
                    const isActive = activeIndex === index;
                    const className = `word ${isActive ? 'word-active' : ''}`;

                    return (
                        <span key={ index } className={ className }>{ word }</span>
                    );
                })}
            </StyledCycler>
        );
    }
}

const StyledCycler = styled.p`
    position: relative;
    overflow: hidden;
    height: 6.6rem;
    transition: height 0.3s ease-in-out;

    .word {
        opacity: 0;
        transform: translateX(-100%);
        display: inline-block;
        position: absolute;
        transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
    }

    .word-active {
        opacity: 1;
        transform: translateX(0);
    }

    ${Media.tablet`
        height: 5.5rem;
    `}
`;

export default Cycler;
