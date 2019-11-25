import React from 'react';

import Periscope from '@components/Periscope';
import Title from '@components/Title';
import ScrollAnimation from '@animations/ScrollAnimation';

const WhatWeDo = () => {
    return (
        <Periscope className="section-pad-double">
            <a name="what-we-do"></a>
            <div className="row">
                <div className="column">
                    <Title lines={['What', 'we do']} offsets={{ lg: [6, 0] }} />
                </div>
                <div className="column">
                    <p>We’re part agency and part consultancy (think of the
                        good parts). We don’t arrive with any preconceived
                        ideas – but look at all avenues. The answer might be
                        through technology, data, customer experience or
                        product development. Or it might be through brand or
                        marketing communications. We’ll work with you to define
                        the problem, find the best solution and then, if you
                        want, execute it. That’s what we do.</p>

                    <ScrollAnimation />
                </div>
            </div>
        </Periscope>
    );
};

export default WhatWeDo;
