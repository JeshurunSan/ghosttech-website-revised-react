import React from 'react';

import Periscope from '@components/Periscope';
import Title from '@components/Title';

import AssignAnimation from '@animations/AssignAnimation';
import AccellerateAnimation from '@animations/AccellerateAnimation';
import AugmentAnimation from '@animations/AugmentAnimation';

const HowWeWork = () => {
    return (
        <Periscope>
            <a name="how-we-work"></a>
            <div className="row">
                <div className="column">
                    <Title lines={['How we', 'can work', 'together']} mobileLines={['How', 'we can', 'work', 'to- gether']} offsets={{ lg: [-6, -13, 0]}} align="right" />
                </div>
            </div>
            <div className="row">
                <div className="column">
                    &nbsp;
                </div>
                <div className="column">
                    <p>We don’t want to run your business or tell you how to run your business. We don’t want to take over the world. What we want is to solve a problem that you have.</p>
                    <p>We do that by listening, and by working closely with you and your stakeholders, understanding your organisation environment and your audience.</p>

                    <div className="row row-small">
                        <div className="column">
                            <AssignAnimation />
                            <h3>Assign</h3>
                            <p>You can assign us a project to get done what you want done, from strategy through conception to production, delivery and performance optimisation.</p>
                        </div>
                        <div className="column">
                            <AccellerateAnimation />
                            <h3>Accelerate</h3>
                            <p>You can bring us in to accelerate your ideas with us working alongside you, helping you develop strategy, business cases and supporting prototypes for audience validation and engagement of key stakeholders.</p>
                        </div>
                        <div className="column">
                            <AugmentAnimation />
                            <h3>Augment</h3>
                            <p>We can augment your existing teams with our ‘invisible team’ of strategic, creative and technology people fusing your subject matter experts with ours to realise the outcomes that matter most to you and your team.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Periscope>
    );
};

export default HowWeWork;
