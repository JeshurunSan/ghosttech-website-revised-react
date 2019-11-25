import { css } from 'styled-components';

const breakpoints = {
    large: { width: 1680, height: 0 },
    desktop: { width: 992, height: 0 },
    tablet: { width: 768, height: 0 },
    phone: { width: 576, height: 0 }
};

const Media = Object.keys(breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (min-width: ${breakpoints[label].width}px) and (min-height: ${breakpoints[label].height}px) {
            ${css(...args)}
        }
    `;

    return acc;
}, {});

export default Media;
