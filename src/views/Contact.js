import React, { Fragment } from 'react';

import Content from '../Content';

import Periscope from '@components/Periscope';
import Title from '@components/Title';
import Button from '@components/Button';

import ArrowRight from '@svg/arrow-right.svg';

const Contact = () => {
    return (
        <Fragment>
            <Periscope className="section-pad-double">
                <div className="row">
                    <div className="column">
                        <Title lines={['Get in', 'touch']} />
                    </div>
                    <div className="column">
                        <p>If you’d like to learn more about our work across New Zealand, Japan, Singapore, China and Australia, or discuss how we can be of help to you and your team, please get in touch.</p>

                        <div className="button-wrapper">
                            <Button href={ `mailto:${Content.Email}` }>Get in touch <ArrowRight /></Button>
                        </div>
                    </div>
                </div>
            </Periscope>
        </Fragment>
    );
};

export default Contact;
