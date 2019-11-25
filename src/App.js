import React, { Component, Fragment } from 'react';

import { AppContext } from '@providers/AppProvider';

import Hamburger from '@components/Hamburger';
import Menu from '@components/Menu';
import Container from '@components/Container';

import Intro from '@views/Intro';
import WhoAreWe from '@views/WhoAreWe';
import WhatWeDo from '@views/WhatWeDo';
import HowWeWork from '@views/HowWeWork';
import Capabilities from '@views/Capabilities';
import WhyGhost from '@views/WhyGhost';
import Contact from '@views/Contact';

import ScrollAnimation from '@animations/ScrollAnimation';

class App extends Component {
    static contextType = AppContext;

    render() {
        const { isMenuOpen } = this.context;

        return (
            <Fragment>
                <Hamburger isMenuOpen={ isMenuOpen } />
                <Menu isMenuOpen={ isMenuOpen } />

                {/* GHOST TECH START */}
                <Container>
                    <Intro />
                </Container>

                <Container padTop={ false }>
                    <div className="row">
                        <div className="column">
                            &nbsp;
                        </div>
                        <div className="column">
                            <ScrollAnimation />
                        </div>
                    </div>
    
                    <WhoAreWe />
                    <Contact />
                </Container>
                {/* GHOST TECH END */}


                {/* GHOST PARTNERS START

                <Container>
                    <Intro />
                    <WhatWeDo />
                    <HowWeWork />
                </Container>

                <a name="our-capabilities"></a>
                <Capabilities />

                <Container padTop={ true }>
                    <WhoAreWe />
                    <WhyGhost />
                    <Contact />
                </Container>
                
                GHOST PARTNERS END */}
            </Fragment>
        );
    }
}

export default App;
