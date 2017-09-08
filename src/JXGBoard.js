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
                boundingbox: [-3, 3, 3, -3]
            });

        graphTypes[this.props.type || 0](board);

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
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
};
