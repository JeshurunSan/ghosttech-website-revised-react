import React, { Fragment } from 'react';

import Periscope from '@components/Periscope';
import Title from '@components/Title';

import ScrollAnimation from '@animations/ScrollAnimation';

const WhyGhost = () => {
    return (
        <Fragment>
            <a name="why-ghost"></a>
            <Periscope className="section-pad-double">
                <div>
                    <Title lines={['Why are', 'we called', 'Ghost?']} mobileLines={['Why are we called Ghost?']} />

                    <div className="row">
                        <div className="column">
                            <ScrollAnimation property="bottom" speed={ 2 } isSmall={ true } />
                        </div>
                        <div className="column">
                            <p>Glad you asked. We’re called Ghost because our job is not to be visible. Instead it’s our client’s visibility that matters the most. We're the ones in the background, the ones whose only noise you’ll hear is a quiet ‘yes’ when we’ve solved a problem.</p>
                        </div>
                    </div>
                </div>
            </Periscope>
        </Fragment>
    );
};

export default WhyGhost;
