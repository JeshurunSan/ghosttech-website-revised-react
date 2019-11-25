import React from 'react';
import Expander from '@components/Expander';
import Title from '@components/Title';

const Capabilities = () => {
    return (
        <Expander>
            <Title isAnimated={ false } lines={['Our', 'capabilities']} mobileLines={['Our', 'capa-', 'bilities']} />

            <div className="row">
                <div className="column">
                    <p>Our people have been at the forefront of digital, customer experience design and creative and communications industries for the past twenty years. Ghost gives flexibility as to how clients can utilise world-class depth and breadth of capability in a way that suits them across;</p>
                </div>
                <div className="column">
                    &nbsp;
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <h3>Data driven Strategy, Validation and Performance:</h3>
                </div>
                <div className="column">
                    &nbsp;
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>We work with you to unearth insights, and develop strategies to achieve your outcomes.</p>
                </div>
                <div className="column">
                    <ul>
                        <li>Audience research and user testing</li>
                        <li>Hypothesis creation, rapid market validation and digital performance optimisation</li>
                        <li>Strategy development across digital communications and marketing, new product, digital innovation, brand and customer experience.</li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <h3>Collaborative Concept, Creative &amp; Content Development</h3>
                </div>
                <div className="column">
                    &nbsp;
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>We work with you to co-create concepts and iterate solution designs, testing them continuously to ensure they’re true to strategy and answer your objectives before commencing production.</p>
                </div>
                <div className="column">
                    <ul>
                        <li>Ideation &amp; concept development</li>
                        <li>Product &amp; Concept prototyping and testing</li>
                        <li>Art direction &amp; copy</li>
                        <li>Experience and service design</li>
                        <li>Brand experience design &amp; development</li>
                        <li>Digital and integrated campaigns</li>
                        <li>Creative and content creation</li>
                        <li>Experiential</li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <h3>World-class Production &amp; Delivery</h3>
                </div>
                <div className="column">
                    &nbsp;
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Our world-class network of designers, creatives, developers and motion and CGI experts have delivered numerous major projects around the globe. We assemble a production team from this network customised to your project needs (not based on feeding a team of full time staff ), giving you a quality outcome, delivered and resourced efficiently.</p>
                </div>
                <div className="column">
                    <ul>
                        <li>Web and App Development (front / back / full-stack)</li>
                        <li>Asset production</li>
                        <li>Graphic design</li>
                        <li>Photography</li>
                        <li>Motion graphics and videography</li>
                        <li>CGI Visualisation and Production</li>
                    </ul>
                </div>
            </div>
        </Expander>
    );
};

export default Capabilities;
