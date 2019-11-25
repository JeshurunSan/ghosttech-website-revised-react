import React, { Component } from 'react';

class Periscope extends Component {

    constructor() {
        super();

        this.ref = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            isVisible: false
        };
    }

    handleScroll(event) {
        const { isVisible } = this.state;

        if (isVisible) {
            return;
        }

        const newVisibility = this.isVisible();

        this.setState({
            isVisible: newVisibility
        });
    }

    isVisible() {
        const { current } = this.ref;

        const bounds = current.getBoundingClientRect();

        return (bounds.top >= 0 && bounds.top < window.innerHeight) ||
            (bounds.bottom <= window.innerHeight && bounds.bottom > 0);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        this.setState({
            isVisible: this.isVisible()
        });
    }

    render() {
        const { isVisible } = this.state;
        const { className } = this.props;

        const children = React.Children.map(this.props.children, (child) => {
            const { props } = child;

            const className = [
                'animated',
                props.className || '',
                isVisible ? 'visible' : 'invisible'
            ];

            return React.cloneElement(child, {
                className: className.join(' ')
            });
        });

        return (
            <section ref={ this.ref } className={ `section ${className || ''}`}>
                { children }
            </section>
        );
    }
}

export default Periscope;
