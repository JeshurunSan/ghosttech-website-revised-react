import React, { Component } from 'react';
import styled from 'styled-components';
import Media from '@style/media';

import Email from '@svg/email.svg';
import Phone from '@svg/phone.svg';
import LinkedIn from '@svg/linkedin.svg';

class Profile extends Component {

    render() {
        const {
            name,
            linkedin,
            photo,
            phone,
            email,
            ...rest
        } = this.props;

        const splitName = name.replace(/ /, '<br /> ');

        return (
            <StyledProfile { ...rest }>
                <div className="photo">
                    <img src={ photo } alt={ name } />
                </div>
                <h4 dangerouslySetInnerHTML={{ __html: splitName }}></h4>

                <div className="actions">
                    { linkedin && <a href={ linkedin } target="_blank"><LinkedIn /></a> }
                    { phone && <a href={ `tel:${phone}` }><Phone /></a> }
                    { email && <a href={ `mailto:${email}` }><Email /></a> }
                </div>
            </StyledProfile>
        );
    }
}

const StyledProfile = styled.div`
    width: 50%;
    max-width: 19rem;
    box-sizing: border-box;
    padding: 0 2rem;
    transform: translateY(50%) skew(0, 5deg);
    transition: transform 1s ${props => props.delay * 0.5}s ease-in-out,
        opacity 1s ${props => props.delay * 0.5}s ease-in-out;
    opacity: 0;

    ${Media.desktop`
        transition-delay: ${props => props.delay}s, ${props => props.delay}s;
    `}
    
    .profiles.visible & {
        transform: translateY(0%);
        transform-origin: 0 0;
        opacity: 1;
    }
    
    .photo {
        background: ${props => props.theme.colourTextLight};
        border-radius: 10rem 10rem 0 0;
        overflow: hidden;
        width: 100%;

        img {
            display: block;
            width: 100%;
            transform: translateY(100%);
            transition: transform 1s ${props => props.delay * 0.5}s ease-in-out;

            .visible & {
                transform: translateY(0%);
            }

            ${Media.desktop`
                transition-delay: ${props => props.delay}s;
            `}
        }
    }

    h4 {
        text-align: center;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 1.5rem;
        margin: 1rem 0 1rem 0;
        color: #777777;
    }

    .actions {
        display: flex;
        justify-content: center;

        svg {
            height: 1.6rem;
            margin: 0 0.8rem;
        }

        path {
            fill: #777777;
        }
    }
`;

export default Profile;
