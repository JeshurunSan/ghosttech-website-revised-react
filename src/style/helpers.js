export const transitionDelay = (count, offset, base = 0) => {
    let css = '';

    for (let i = 1; i <= count; i++) {
        css += `
        &:nth-child(${i}) {
            transition-delay: ${base + (offset * (i - 1))}s;
        }
        `;
    }

    return css;
};
