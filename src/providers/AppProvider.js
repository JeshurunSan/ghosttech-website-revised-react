import React, { Component } from 'react';
import { debounce } from 'debounce';

const AppContext = React.createContext({ isMenuOpen: false });

class AppProvider extends Component {

    constructor() {
        super();

        this.state = {
            isMenuOpen: false,
            isExpanderOpen: false
        };

        this.publicMethods = {
            toggleMenu: this.toggleMenu.bind(this),
            toggleExpander: this.toggleExpander.bind(this)
        };

        this.handleResize = debounce(this.handleResize.bind(this), 100);
    }

    toggleMenu() {
        const { isMenuOpen } = this.state;

        this.setState({
            isMenuOpen: !isMenuOpen
        });
    }

    toggleExpander(forceState = null) {
        let { isExpanderOpen } = this.state;

        if (forceState !== null) {
            isExpanderOpen = forceState;
        } else {
            isExpanderOpen = !isExpanderOpen;
        }

        this.setState({
            isExpanderOpen
        });
    }

    handleResize() {
        // Close the menu if we resize, it's too complex to resize it
        this.setState({
            isMenuOpen: false
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    render() {
        const { children } = this.props;

        return (
            <AppContext.Provider value={{ ...this.state, ...this.publicMethods }}>
                { children }
            </AppContext.Provider>
        );
    }
}

export {
    AppProvider,
    AppContext
};
