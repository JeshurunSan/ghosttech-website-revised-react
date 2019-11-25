import React, { Component } from 'react';
import styled from 'styled-components';
import Media from '@style/media';

class Title extends Component {

    static defaultProps = {
        lines: [],
        mobileLines: [],
        align: 'left',
        offsets: { lg: [0, 0, 0, 0] },
        isAnimated: true
    };

    constructor() {
        super();

        this.renderLine = this.renderLine.bind(this);
        this.renderWord = this.renderWord.bind(this);
        this.renderLetter = this.renderLetter.bind(this);
    }

    render() {
        const {
            lines,
            mobileLines,
            offsets,
            align,
            isAnimated
        } = this.props;

        const hasMobileLines = mobileLines.length > 0;

        return (
            <StyledTitle isAnimated={ isAnimated } className={`title-${align}`}>
                <div className={ hasMobileLines ? 'hide-sm' : '' }>
                    <h2>{ this.renderLines(lines, offsets) }</h2>
                </div>

                { hasMobileLines &&
                <div className="hide-lg">
                    <h2>{ this.renderLines(mobileLines) }</h2>
                </div>
                }
            </StyledTitle>
        );
    }

    renderLines(lines, offsets = {}) {
        let lineOffset = -lines[0].length;

        return lines.map((line, index) => {
            lineOffset += line.length;

            return this.renderLine(line, index, offsets, lineOffset);
        });
    }

    renderLine(line, index, offsets, lineOffset) {
        const offsetKeys = Object.keys(offsets);
        const offsetClasses = [];

        offsetKeys.map((key) => {
            const value = offsets[key][index];
            const type = value >= 0 ? 'push' : 'pull';

            if (value === 0) {
                return;
            }

            offsetClasses.push(`line-${type}-${key}-${Math.abs(value)}`);
        });

        let words = line.split(' ');

        words = words.map((word, index) => {
            return (index === words.length - 1) ? word : `${word} `;
        });

        return (
            <span className={ `line ${offsetClasses.join(' ')}` } key={ index }>
                { words.map((word, wordIndex) => {
                    return this.renderWord(word, wordIndex, lineOffset);
                }) }
            </span>
        );
    }

    renderWord(word, index, lineOffset) {
        const letters = word.split('');

        return (
            <span className="word" key={ index }>
                { letters.map((letter, letterIndex) => this.renderLetter(letter, lineOffset + letterIndex)) }
            </span>
        );
    }

    renderLetter(letter, index) {
        this.letterIndex++;
        const isSpace = (letter === ' ');

        if (isSpace) {
            letter = '&nbsp;';
        }

        return (
            <span key={ index } className="mask">
                <span
                    className={ `letter letter-${index + 1} ${isSpace ? 'letter-space' : ''}`}
                    dangerouslySetInnerHTML={{ __html: letter }} />
            </span>
        );
    }
};

const letterDelay = (count) => {
    let style = '';

    for (let i = 1; i <= count; i++) {
        style += `
            .letter-${i} {
                transition-delay: ${i * 0.07}s;
            }
        `;
    }

    return style;
};

const StyledTitle = styled.div`
    overflow: hidden;

    h2 {
        transition: transform 0.5s 0.5s ease-in-out;
    }

    .word {
        display: inline-block;
        white-space: nowrap;
    }

    .mask {
        display: inline-block;
        overflow: hidden;
    }

    .letter {
        display: inline-block;
        transition: transform 0.5s 0s ease-in-out;
        transform: ${props => props.isAnimated ? 'translateX(-120%)' : 'none'};
        transform-origin: 0 0;
        /* will-change: transform; */
    }

    .visible & {
        .letter {
            transform: translateX(0);
        }
    }

    ${Media.desktop`

        .line { 
            display: block;
        }

        &.title-right {
            text-align: right;

            h2 {
                margin-right: 0;
            }
        }
        
        .line-push-lg-6 {
            transform: translateX(6rem);
        }

        .line-push-lg-11 {
            transform: translateX(11rem);
        }

        .line-pull-lg-6 {
            transform: translateX(-6rem);
        }

        .line-pull-lg-13 {
            transform: translateX(-13rem);
        }
    `}

    ${letterDelay(30)};
`;

export default Title;
