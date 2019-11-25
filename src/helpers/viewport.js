export const getViewportPercentage = (element, property = 'top') => {
    const bounds = element.getBoundingClientRect();

    const yPosition = Math.max(window.innerHeight - bounds[property], 0);
    const viewportScrollPercentage = yPosition / window.innerHeight;

    return viewportScrollPercentage;
};

export const getDistancePercentage = (element, property = 'top') => {
    const bounds = element.getBoundingClientRect();

    const distance = bounds[property] - window.innerHeight;
    const totalDistance = (bounds[property] + window.scrollY) - window.innerHeight;
    const progress = distance / totalDistance;

    return 1 - progress;
};

export const isMobileViewport = () => {
    return window.innerWidth < 768;
};
