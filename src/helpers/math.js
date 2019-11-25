export const lerp = (min, max, percentage) => {
    return (1.0 - percentage) * min + percentage * max;
};

export const length = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
};
