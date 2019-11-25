import React, { Fragment } from 'react';

import Content from '../Content';

import Periscope from '@components/Periscope';
import Profile from '@components/Profile';
import Title from '@components/Title';

const WhoAreWe = () => {
    return (
        <Fragment>
            <a name="who-are-we"></a>
            <Periscope className="section-pad-double">
                <div className="row">
                    <div className="column">
                        <Title lines={['Who', 'are', 'we?']} mobileLines={['Who are we?']} offsets={{ lg: [0, 11, 0]}} />
                    </div>
                    <div className="column">
                        <p>We’ve been developers, tech leads, heads of digital, product designers, architects, founders, advisors, and CTOs.</p>
                        <p>We’ve run tech businesses and have helped New Zealand’s biggest organisations evolve from legacy systems to new & emerging technologies.</p>
                        <p>We’ve brought products to life, we’ve also helped figure out where products should go next.</p>
                        <p>Interested in a demo? Contact our co-founders to book a time to visit us in person at our Auckland CBD studio or to catch up via video conference.</p>

                        <Periscope>
                            { Content.People.map((row, rIndex) => {
                                return (
                                    <div className="profiles" key={ rIndex }>
                                        { row.map((person, pIndex) =>
                                            <Profile
                                                key={ pIndex }
                                                delay={ 1 + ((rIndex + pIndex) * 0.2) }
                                                { ...person } />
                                        )}
                                    </div>
                                );
                            })}
                        </Periscope>
                        <Periscope>
                            { Content.TechLeadershipTeam.map((row, rIndex) => {
                                return (
                                    <div className="profiles" key={ rIndex }>
                                        <i>Tech Leadership Team</i>
                                        { row.map((person, pIndex) =>
                                            <Profile
                                                key={ pIndex }
                                                delay={ 1 + ((rIndex + pIndex) * 0.2) }
                                                { ...person } />
                                        )}
                                    </div>
                                );
                            })}
                        </Periscope>
                        <Periscope>
                            { Content.FullStackDevelopers.map((row, rIndex) => {
                                return (
                                    <div className="profiles" key={ rIndex }>
                                        <i> Full Stack Developers</i>
                                        { row.map((person, pIndex) =>
                                            <Profile
                                                key={ pIndex }
                                                delay={ 1 + ((rIndex + pIndex) * 0.2) }
                                                { ...person } />
                                        )}
                                    </div>
                                );
                            })}
                        </Periscope>
                        <Periscope>
                            { Content.DataandIntegrationEngineers.map((row, rIndex) => {
                                return (
                                    <div className="profiles" key={ rIndex }>
                                        <i>Data & Integration Engineers</i>
                                        { row.map((person, pIndex) =>
                                            <Profile
                                                key={ pIndex }
                                                delay={ 1 + ((rIndex + pIndex) * 0.2) }
                                                { ...person } />
                                        )}
                                    </div>
                                );
                            })}
                        </Periscope>
                    </div>
                </div>
            </Periscope>
        </Fragment>
    );
};

export default WhoAreWe;
