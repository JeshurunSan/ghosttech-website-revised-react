import { createGlobalStyle } from 'styled-components';
import { styledNormalize } from 'styled-normalize';
import { transitionDelay } from '@style/helpers';
import Media from '@style/media';

export default createGlobalStyle`
    ${styledNormalize}

    
    i {
        color: ${props => props.theme.colourTextHeading};
        width: 100%;
        display: flex;
        padding: 0 0 20px 20px;
        font-weight: 700;
        font-size: 2.1rem;
        line-height: 1.3;
        font-style: normal; 
    }

    a {
        -webkit-tap-highlight-color: transparent;
    }

    html, body {
        margin: 0;
        padding: 0;
        display: block;
    }

    html {
        font-size: 62.5%;
    }

    body {
        background: ${props => props.theme.colourBackground};
        color: ${props => props.theme.colourTextDark};
        font-family: ${props => props.theme.fontFamily};
        font-size: 1.7rem;
        font-weight: 500;
        line-height: 1.53;
    }

    h2 {
        color: ${props => props.theme.colourTextHeading};
        font-weight: 800;
        text-transform: uppercase;
        font-size: 6.3rem;
        line-height: 0.8;
        margin: 4rem 0 4rem 0;
        overflow: hidden;

        ${Media.desktop`
            font-size: 10rem;
            margin: 0 6rem 4rem 0;
        `}
    }

    h3 {
        font-weight: 700;
        font-size: 3rem;
        margin: 0 0 2rem 0;
        line-height: 1.3;

        ${Media.desktop`
            font-size: 2.1rem;
            margin: 6rem 0 2rem 0;
        `}
    }

    .lead {
        font-weight: 700;
        font-size: 3rem;
        line-height: 1.1;
        margin: 0 0 2rem 0;

        ${Media.desktop`
            font-size: 5rem;
            margin-left: 32.2%;
        `}
    }

    p {
        margin: 0 0 2.25rem 0;
    }

    .animated { 
        p {
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
            ${transitionDelay(10, 0.2, 0.5)};
            transform-origin: 0 0;
        }

        &.invisible {
            p {
                opacity: 0;
                transform: translateY(5rem) skew(0, 5deg);
            }
        }

        &.visible {
            p {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    ul {
        margin: 0 0 1.5rem 0;
        padding: 0 0 0 1.5rem;

        li {
            margin: 0 0 1.5rem 0;
        }
    }

    .screen {
        min-height: calc(100vh - 8rem);
        position: relative;
        padding-top: 4rem;

        ${Media.desktop`
            padding-top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        `};
    }

    .row {
        ${Media.desktop`
            display: flex;
            flex-direction: row;
        `};
    }

    .row-small {
        margin: 0 -2rem;
        
        h3 {
            margin: 3rem 0 1rem 0;
        }

        .column {
            box-sizing: border-box;
            margin: 0 2rem;

            &:last-child {
                padding: 0;
            }
        }

        p {
            font-size: 1.4rem;
        }
    }

    .column {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .section {

        &.section-pad {
            margin-bottom: 4rem;
        }

        &.section-pad-double {
            margin-bottom: 8rem;
        }

        ${Media.desktop`
            &.section-pad {
                margin-bottom: 8rem;
            }

            &.section-pad-double {
                margin-bottom: 16rem;
            }
        `};
    }

    .profiles {
        display: flex;
        flex-wrap: wrap;
        margin: 2rem 0 4rem -2rem;
    }

    .hide-sm {
        display: none;

        ${Media.desktop`
            display: block;
        `};
    }

    .hide-lg {
        ${Media.desktop`
            display: none;
        `};
    }

    .button-wrapper {
        clip-path: inset(0 0 0 0);
        transition: clip-path 0.5s 1s ease-in-out;

        .invisible & {
            clip-path: inset(0 100% 0 0);
        }
    }
`;
