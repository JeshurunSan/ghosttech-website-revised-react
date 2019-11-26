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
                    <p>We are a curated team of developers, data engineers, data strategists, tech leads, heads of digital, architects, founders, advisors, and CTOs.</p>
                    <p>Our collective has run tech businesses and have helped New Zealand’s biggest organisations evolve from legacy systems to new & emerging technologies.</p>
                    <p>We’ve brought products to life, provided clarity on where products should go next and enabled innovative experiences through technology.</p>
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
                                        <h3>Tech Leadership Team</h3>
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
                                        <h3> Full Stack Developers</h3>
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
                            { Content.DataAndIntegrationEngineers.map((row, rIndex) => {
                                return (
                                    <div className="profiles" key={ rIndex }>
                                        <h3>Data & Integration Engineers</h3>
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
