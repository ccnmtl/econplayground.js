import React from 'react';
import PropTypes from 'prop-types';
import {graphTypes} from './graphTypes.js';

export default class JXGBoard extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {board: null};
        this.style = {width: 405, height: 200};
    }

    componentDidMount() {
        // The jsxgraph npm package is out of date so I'm including
        // this package globally for now.
        if (!window.JXG) {
            return;
        }

        let board = window.JXG.JSXGraph.initBoard(
            this.id, {
                axis: true,
                defaultAxes: {
                    x: {
                        ticks: {visible: false}
                    },
                    y: {
                        ticks: {visible: false}
                    }
                },
                showCopyright: false,
                showZoom: false,
                showReload: false,
                showNavigation: false,
                boundingbox: [-0.5, 5, 5, -0.5]
            });

        graphTypes[this.props.type || 0](board, {
            showIntersection: (
                typeof this.props.displayIntersection === 'undefined') ?
                true :
                this.props.displayIntersection
        });

        this.setState({board: board});
    }

    // called only if shouldComponentUpdate returns true
    // for rendering the JSXGraph board div and any child elements
    render() {
        return (
            <div id={this.id} className="jxgbox" style={this.style}>
            </div>
        );
    }
}

JXGBoard.propTypes = {
    displayIntersection: PropTypes.bool,
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
};
